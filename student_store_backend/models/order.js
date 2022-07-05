const db = require("../db")

class Order {

    static async listOrdersForUser(user) {
        //return all orders that the authenticated user has created
        const results = await db.query(`
            SELECT orders.id AS "orderId",
                   orders.customer_id AS "customerId",
                   order_details.quantity AS "quantity",
                   products.name AS "name",
                   products.price AS "price"
            FROM orders
                JOIN order_details ON orders.id = order_details.order_id
                JOIN products ON products.id = order_details.product_id
            WHERE orders.customer_id =
                (SELECT id FROM users WHERE email = $1) 
        `, [user.email])
        return results.rows


    }

    static async createOrder({order, user}) {
        //take in a user's order and store it in the database

        //inserting order and retrieving order id to use for order details loop
        const results = await db.query(`
            INSERT INTO orders (customer_id)
            VALUES ((SELECT id FROM users WHERE email = $1))
            RETURNING id
        `, [user.email])

        const orderId = results.rows[0]



        // looping through each item in user's order and adding a row to order details for each product in order

        Object.keys(order).forEach((productId) => {
            db.query(`
                INSERT INTO order_details (
                    order_id,
                    product_id,
                    quantity
                )
                VALUES ($1, $2, $3)
            `, [orderId.id, productId, order[productId]])
        })
        





        
    }




}


module.exports = Order