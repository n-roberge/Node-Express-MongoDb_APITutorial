const express = require("express");
const { User, validateUser } = require("../models/user");
const { Product, validateProduct } = require("../models/product")
const router = express.Router();


//POST a user
//http://localhost:3007/api/users

router.post("/", async (req,res)=>{
    try {
        let { error } = validateUser(req.body);
        if (error) return res.status(400).send(`Body for user not valid! ${error}`);

        let newUser = await new User(req.body);
        await newUser.save();
        return res.status(201).send(newUser);

    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    };
});

//GET all users
//http://localhost:3007/api/users

router.get("/", async (req,res)=>{
    try {
        let users = await User.find();
        if (!users) return res.status(400).send(`No users in the collection!`);
        return res.send(users);
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
});

//POST a product to a shopping cart
//http://localhost:3007/api/users/:userId/shoppingcart/:productId

//PUT an existing product in shopping cart
//http://localhost:3007/api/users/:userId/shoppingcart/:productId

//DELETE an existing product in a shopping cart
//http://localhost:3007/api/users/:userId/shoppingcart/:productId

module.exports = router;