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
};

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
};

const deleteProduct = async (req, res) => {
    const { codigo } = req.params;
    try {
        const deletedProduct = await Product.findOneAndDelete({ codigo: Number(codigo) });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }
        res.json({ message: "Producto eliminado correctamente" });
    } catch (err) {
        console.error("Error en deleteProduct:", err);
        res.status(500).json({ error: err.message || "Error interno" });
    }
}

const searchProduct = async (req, res) => {
    
    const { q } = req.query;

    if (!q || q.trim() === "") {
    return res.status(400).json({ message: "El campo de búsqueda no puede estar vacío" });
    }

    try {
    const products = await Product.find({
        nombre: { $regex: q, $options: 'i' }
    });

    if (products.length === 0) {
        return res.status(404).json({ message: "No products found for the given term." });
    }

    res.json({ products });
    } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Error while searching products", error });
}
};

const getProductByCategory = async (req, res) => {
    const { categoria } = req.params;
    if (!categoria || categoria.trim() === "") {
        return res.status(400).json({message: "el campo no puede estar vacio"})
    }
        try {
    const products = await Product.find({ categoria: { $regex: categoria, $options: 'i' } });

    if (products.length === 0) {
        return res.status(404).json({ message: "No se encontraron productos para esa categoría" });
    }

    res.json({ products });
    } catch (error) {
    console.error("Error al buscar por categoría:", error);
    res.status(500).json({ message: "Error interno al buscar productos", error });
}
};

const priceRange = async (req, res) => {
    const {precio} = req.params;
    const [minPrice, maxPrice] = precio.split('-')
    const min = Number(minPrice);
    const max = Number(maxPrice);

    if (isNaN(min) || isNaN(max)) {
            return res.status(400).json({ message: 'Rango de precios inválido. Usá el formato /precio/100-500' });
    }
    try {
        const products = await Product.find({
            precio: {  $gte: min, $lte: max }
        })
        if (products.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos en ese rango de precio' });
    }

    res.json({ products });
    } catch (error) {
    console.error('Error al buscar por rango de precio:', error);
    res.status(500).json({ message: 'Error interno al buscar productos', error });
}
};


module.exports = {
    getProductAll,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getProductByCategory,
    priceRange,
};
