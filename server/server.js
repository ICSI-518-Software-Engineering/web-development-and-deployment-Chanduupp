// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const uri = 'mongodb+srv://chandu:x1Pbx2G7XwujYKD4@cluster0.ckqpwfx.mongodb.net/'; // Replace with your MongoDB Atlas URI
const client = new MongoClient(uri);

let productsCollection;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connected to MongoDB Atlas');

        const database = client.db('inventory'); // Replace with your database name
        productsCollection = database.collection('products');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
    }
}

connectToDatabase();

const storage = multer.memoryStorage(); // Use memory storage for handling file as buffer
const upload = multer({ storage: storage });

const fs = require('fs');

app.get('/products', async (req, res) => {
    try {
        const products = await productsCollection.find().toArray();
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/add', (req, res) => {
    const { number1, number2 } = req.body;
    // Ensure numbers are parsed as integers or floats as needed
    const sum = Number(number1) + Number(number2);
    res.json({ sum });
});

app.post('/products', upload.single('image'), async (req, res) => {
    try {
        const { name, quantity } = req.body;
        const image = req.file.buffer.toString('base64'); // Convert buffer to base64 string
        const newProduct = { name, quantity, image };
        await productsCollection.insertOne(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        await productsCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatedProduct });
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await productsCollection.deleteOne({ _id: new ObjectId(id) });
        res.status(204).end();
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log('Server listening on port ${PORT}');
});