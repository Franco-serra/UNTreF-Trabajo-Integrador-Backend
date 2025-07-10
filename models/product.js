import {schema, model} from 'mongoose';

const productSchema = new schema({
    codigo: {type :String, required: true, unique: true},
    nombre: {type: String, required: true},
    precio: {type: Number, required: true},
    categoria: {type: [String], required: true},
})

const Product = model('Product', productSchema);

export default Product;