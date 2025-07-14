const Product = require('../models/product');


const getProductAll = async (req, res) => { 
    const codigo = req.query.codigo;
    const query = !codigo ? {} : { codigo: { $regex: codigo, $options: "i" } };

    try {
        const products = await Product.find(query);
        if (products.length === 0) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error("Error en getProductAll:", err);
        res.status(500).json({ error: err.message || "Error interno" });
    }
};

const getProductById = async (req, res) => {
};

module.exports = {
    getProductAll,
    getProductById,
};
