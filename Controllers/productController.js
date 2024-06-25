const Product = require('../models/Product'); // Assuming you have a Product model

// Get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Create a new product
const createProduct = async (req, res) => {
    const { name, price, description } = req.body;

    try {
        const newProduct = new Product({ name, price, description });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    const productId = req.params.productId; // Assuming productId is passed in the URL
    const { name, price, description } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, { name, price, description }, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (err) {
        console.error('Error updating product:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    const productId = req.params.productId; // Assuming productId is passed in the URL

    try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        console.error('Error deleting product:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = { getAllProducts, createProduct, updateProduct, deleteProduct };
