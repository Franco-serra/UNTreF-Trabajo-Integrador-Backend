const express = require("express");
const router = express.Router();
const { 
    getProductAll, 
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
    getProductByCategory,
    priceRange,

    } = require("../controllers/productController");

router.get("/productos", getProductAll);

router.get("/productos/buscar", searchProduct);

router.get("/productos/:codigo", getProductById);

router.get("/productos/categoria/:categoria", getProductByCategory)

router.get("/productos/precio/:precio", priceRange)

router.post("/productos", createProduct);

router.put("/productos/:codigo", updateProduct);

router.delete("/productos/:codigo", deleteProduct);

module.exports = router;