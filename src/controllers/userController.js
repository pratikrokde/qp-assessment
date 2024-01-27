const { runQuery } = require("../config/dbConnect");

const getAllAvailableItems = async (req, res) => {
    try {
        const query = getAllAvailableItemsQuery();
        const allAvailableItemsData = await runQuery(query);
        if (!allAvailableItemsData.data) res.send({ message: "No records found" })
        else {
            res.status(200).send({
                Items: allAvailableItemsData.data.rows
            })
        }
    } catch (error) {
        console.log('Error - get all items', error);
    }
}

const createOrder = async (req, res) => {
    try {
        const orders = req.body.orders;
        for (const order of orders) {
            try {
                const { name, quantity, user_id } = order;

                const getSingleItemQuery = `SELECT * FROM product where product_name = $1`
                const getSingleItemResponse = await runQuery(getSingleItemQuery, [name])

                if (!getSingleItemResponse.data || getSingleItemResponse.data.rows.length === 0) {
                    return res.status(400).send({ message: 'Item not available' });
                }
                let productId = getSingleItemResponse.data.rows[0].product_id;
                let price = getSingleItemResponse.data.rows[0].price_per;
                let totalAmount = price * quantity;

                const updateStockQuery = `
                    UPDATE product 
                    SET stock = stock - $1 
                    WHERE product_id = $2;
                `
                const updateStockResponse = await runQuery(updateStockQuery, [Number(quantity), productId]);
                console.log({ updateStockResponse });
                const orderdetailInsertQuery = `
                    INSERT INTO "orderdetail" (product_id, quantity, price_per, total_amount)
                    VALUES ( $1, $2, $3, $4)
                    RETURNING orderdetail_id;
                    `;

                const orderDetailResult = await runQuery(orderdetailInsertQuery, [productId, quantity, price, totalAmount]);
                const orderDetailId = orderDetailResult.data.rows[0].orderdetail_id;
                const date = new Date();
                const todaysDate = date.toISOString().split('T')[0];

                const orderInsertQuery = `
                    INSERT INTO "order" (orderdetail_id, user_id, order_date) 
                    VALUES ($1, $2, $3);
                    `;

                const ordersRes = await runQuery(orderInsertQuery, [orderDetailId, user_id, todaysDate]);
                console.log({ ordersRes });
            } catch (error) {
                console.log("Error", error);
            }
        }
    } catch (error) {
        console.log("Error while processing..", error);
        res.status(500).send("Internal Server Error");
    }
    res.status(201).send({
        message: "Order created successfully"
    });
}



const getAllAvailableItemsQuery = () => {
    return `SELECT p.product_id, p.product_name as name,
    CASE
        WHEN u.unit_name = 'each' THEN p.price_per || '/each'
        WHEN u.unit_name = 'kg' THEN p.price_per || '/kg'
        ELSE p.price_per::TEXT
    END AS price,
    p.stock
    FROM
        product p   
    JOIN
        unit u ON p.unit_id = u.unit_id
    WHERE
        p.stock > 0`
}

module.exports = {
    getAllAvailableItems,
    createOrder
}