const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productSchema = new Schema({
    codigo: { type: Number, required: true, unique: true },
    nombre: { type: String, required: true },
    precio: { type: Number, required: true },
    categoria: { type: [String], required: true },
});

const Product = model('Product', productSchema);

module.exports = Product;
