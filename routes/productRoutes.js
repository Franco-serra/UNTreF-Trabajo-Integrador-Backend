const express = require("express");
const router = express.Router();
const { getProductAll } = require("../controllers/productController");

router.get("/productos", getProductAll);

module.exports = router;