const db = require("../db")


class Store {

    static async listProducts() {

        //list all products found in database
        const results = await db.query(`
            SELECT p.id,
                   p.name,
                   p.category,
                   p.image,
                   p.description,
                   p.price
            FROM products AS p
            ORDER BY p.id ASC
        `)
        return results.rows
    }








}





module.exports = Store