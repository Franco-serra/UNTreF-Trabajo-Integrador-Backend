const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/database");
const path = require('path')
const fs = require('fs')

const ruta = path.join(__dirname, 'data', 'computacion.json');
const contenido = fs.readFileSync(ruta, 'utf-8');
const computacion = JSON.parse(contenido);

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Hola, Mundo !" });
});

app.use("/api", productRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
