const express = require("express")
const Order = require("../models/store")
const router = express.Router()






router.get("/",  async (req, res, next) => {
    try {
        //send json response to client with products as the key of an object
        const orders = await Order.listOrdersForUser()
        return res.status(201).json({ orders })
    }
    catch(err) {
        next(err)
    }
})



router.post("/",  async (req, res, next) => {
    try {
        //send json response to client with products as the key of an object
        const order = await Order.createOrder({order})
        return res.status(201).json({ order })
    }
    catch(err) {
        next(err)
    }
})


module.exports = router