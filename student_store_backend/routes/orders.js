const express = require("express")
const Order = require("../models/order")
const security = require("../middleware/security")
const router = express.Router()






router.get("/", security.requireAuthenticatedUser, async (req, res, next) => {
    try {
        //send json response to client with products as the key of an object
        const { user } = res.locals
        const orders = await Order.listOrdersForUser(user)
        return res.status(201).json({ orders })
    }
    catch(err) {
        next(err)
    }
})



router.post("/", security.requireAuthenticatedUser,  async (req, res, next) => {
    try {
        //send json response to client with products as the key of an object
        const { user } = res.locals
        const order = await Order.createOrder({order: req.body.order, user})
        return res.status(201).json({ order })
    }
    catch(err) {
        next(err)
    }
})


module.exports = router