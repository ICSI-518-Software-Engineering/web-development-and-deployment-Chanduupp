import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col, Modal, Form } from 'react-bootstrap';

const Inventory = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        quantity: '',
        image: null,
        imagePreview: null,
    });
    const [showEditModal, setShowEditModal] = useState(false);
    const [editableProduct, setEditableProduct] = useState({ id: null, name: '', quantity: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`http://ec2-3-18-106-116.us-east-2.compute.amazonaws.com:8000/products`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`http://ec2-3-18-106-116.us-east-2.compute.amazonaws.com:8000/products/${productId}`);
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setNewProduct(prev => ({
                ...prev,
                image: file,
            }));

            const reader = new FileReader();
            reader.onloadend = () => {
                setNewProduct(prev => ({
                    ...prev,
                    imagePreview: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newProduct.name);
        formData.append('quantity', newProduct.quantity);
        if (newProduct.image) {
            formData.append('image', newProduct.image);
        }

        try {
            await axios.post(`http://ec2-3-18-106-116.us-east-2.compute.amazonaws.com:8000/products`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setNewProduct({
                name: '',
                quantity: '',
                image: null,
                imagePreview: null,
            });
            setShowModal(false);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleEdit = (product) => {
        setEditableProduct({ id: product._id, name: product.name, quantity: product.quantity });
        setShowEditModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditableProduct(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://ec2-3-18-106-116.us-east-2.compute.amazonaws.com:8000/products/${editableProduct.id}`, {
                name: editableProduct.name,
                quantity: editableProduct.quantity,
            });
            setShowEditModal(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    return (
        <Container>
            <h1>Product List</h1>
            <Button onClick={() => setShowModal(true)} variant="primary">Add Product</Button>

            {products.length === 0 ? (
                <p>No products present</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {products.map((product) => (
                        <Col key={product._id}>
                            <Card>
                                <Card.Img variant="top" src={`data:image/jpeg;base64,${product.image}`} />
                                <Card.Body>
                                    <Card.Title>{product.name}</Card.Title>
                                    <Card.Text>
                                        Quantity: {product.quantity}
                                    </Card.Text>
                                    <Button variant="secondary" onClick={() => handleEdit(product)}>Edit</Button>
                                    <Button variant="danger" onClick={() => deleteProduct(product._id)}>Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            {/* Add Product Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="productName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="name" value={newProduct.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="productImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />
                        </Form.Group>
                        {newProduct.imagePreview && (
                            <img src={newProduct.imagePreview} alt="Product Preview" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                        )}
                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            {/* Edit Product Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group className="mb-3" controlId="editProductName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editableProduct.name}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="editProductQuantity">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={editableProduct.quantity}
                                onChange={handleEditChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Save Changes
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>

    );
};

export default Inventory;