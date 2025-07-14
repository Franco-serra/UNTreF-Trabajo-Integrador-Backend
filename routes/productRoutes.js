const express = require("express");
const router = express.Router();
const { 
    getProductAll, 
    getProductById,
    createProduct,
    updateProduct,

    } = require("../controllers/productController");

router.get("/productos", getProductAll);

router.get("/productos/:codigo", getProductById);

router.post("/productos", createProduct);

router.put("/productos/:codigo", updateProduct);

module.exports = router;