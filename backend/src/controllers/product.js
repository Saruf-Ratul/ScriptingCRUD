// controllers/product.js
const connection = require('../db/connection');

// List all products
const getAllProducts = (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to fetch products' });
        }
        res.status(200).json(result);
    });
};

// Update a product
const updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    const sql = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
    connection.query(sql, [name, price, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to update product' });
        }
        res.status(200).json({ message: 'Product updated successfully' });
    });
};

// Delete a product
const deleteProduct = (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM products WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete product' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    });
};

// Delete products in a batch
const deleteProductsBatch = (req, res) => {
    const { productIds } = req.body;

    const sql = 'DELETE FROM products WHERE id IN (?)';
    connection.query(sql, [productIds], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to delete products batch' });
        }
        res.status(200).json({ message: 'Products batch deleted successfully' });
    });
};

module.exports = {
    getAllProducts,
    updateProduct,
    deleteProduct,
    deleteProductsBatch,
};
