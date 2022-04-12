const {Product, validateProduct} = require("../models/product");
const express = require("express");
const {append} = require("express/lib/response")
const router = express.Router();

//GET all products
http://localhost:3007/api/products
router.get("/", async (req, res) => {
    try {
        let products = await Product.find();
        if (!products) return res.status(400).send(`No products in this collection!`)
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

router.post("/", async (req, res) => {
    try {
        const {error} = validateProduct(req.body)
        if (error) return res.status(400).send(error);

        let newProduct = await new Product(req.body);
        await newProduct.save();

        return res.status(201).send(newProduct);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});


module.exports = router;