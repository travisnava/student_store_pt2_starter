const express = require("express")
const Store = require("../models/store")
const router = express.Router()






router.get("/",  async (req, res, next) => {
    try {
        //send json response to client with products as the key of an object
        const products = await Store.listProducts()
        return res.status(201).json({ products })
    }
    catch(err) {
        next(err)
    }
})



module.exports = router