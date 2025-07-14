const Product = require('../models/product');


const getProductAll = async (req, res) => { 
    const codigo = req.query.codigo;
    const query = !codigo ? {} : { codigo: { $regex: codigo, $options: "i" } };

    try {
        const products = await Product.find(query);
        if (products.length === 0) {
            res.status(404).json({ message: "producto no encontrado" });
        } else {
            res.json(products);
        }
    } catch (err) {
        console.error("Error en getProductAll:", err);
        res.status(500).json({ error: err.message || "Error interno" });
    }
};

const getProductById = async (req, res) => {
    const { codigo } = req.params;
    try {

        const product = await Product.findOne({ codigo: codigo.trim() });

        if (!product) {
        return res.status(404).json({ message: "producto no encontrado" });
        }

        res.json(product);
    } catch (err) {
        console.error("Error en getProductById:", err);
        res.status(500).json({ error: err.message || "Error interno" });
    }
};

const createProduct = async (req, res) => {
    const { codigo, nombre, precio, categoria } = req.body
    try {
        if (!codigo || !nombre || !precio || !categoria) {
            return res.status(400).json({message: "todos los campos son obligatorios"})
        }
    const existing = await Product.findOne({ codigo });
    if (existing) {
        return res.status(409).json({ message: "Ya existe un producto con ese código" });
    }
    const newProduct = new Product ({
        codigo,
        nombre,
        precio,
        categoria
    })
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    } catch (err) {
        console.error("Error en createProduct:", err);
        res.status(500).json({ error: err.message || "Error interno" });
    }
}

const updateProduct = async (req, res) => {
    const { codigo } = req.params;
    const { nombre, precio, categoria } = req.body;
    const updates = {}
    if (nombre !== undefined) updates.nombre = nombre;
    if (precio !== undefined) updates.precio = precio;
    if (categoria !== undefined) updates.categoria = categoria;
    try {
        const updatedProduct = await Product.findOneAndUpdate(
        { codigo: Number(codigo) },
        updates,
        { new: true, runValidators: true }
        ); 

        if (!updatedProduct) {
        return res.status(404).json({ message: "Producto no encontrado" });
        }
        
        res.json(updatedProduct);
    } catch (err) {
        console.error("Error en updateProduct:", err);
        return res.status(500).json({ error: err.message || "Error interno" });
    }
}

module.exports = {
    getProductAll,
    getProductById,
    createProduct,
    updateProduct,
};
