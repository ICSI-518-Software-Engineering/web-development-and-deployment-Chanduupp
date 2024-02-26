const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname,'public')));
//app.use(express.json()); // Built-in middleware for express to handle JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/add', (req, res) => {
    const { number1, number2 } = req.body;
    // Ensure numbers are parsed as integers or floats as needed
    const sum = Number(number1) + Number(number2);
    res.json({ sum });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${ PORT }`);
});