const { runQuery } = require("../config/dbConnect");


const getAllItems = async (req, res) => {
    try {
        const query = getAllItemsQuery();
        const allItemsData = await runQuery(query);
        if (!allItemsData.data) res.send({ message: "No records found" })
        else {
            res.status(200).send({
                Items: allItemsData.data.rows
            })
        }
    } catch (error) {
        console.log('Error fetching all items', error);
    }
}

const addItem = async (req, res) => {
    try {
        const { productName, price, stock, unit } = req.body;
        const query = addQuery();
        const allItemsData = await runQuery(query, [productName, price, stock, unit]);
        if (allItemsData.msg !== 'ok') res.send({ message: "Unable to create record" })
        else {
            res.status(201).send({
                message: 'Record created successfully'
            })
        }
    } catch (error) {
        console.log('Error while creating record', error);
    }
}


const deleteItem = async (request, response) => {
    try {
        const id = request.params.id;
        const query = deleteQuery();
        const deleteItemsData = await runQuery(query, [id]);
        if (deleteItemsData.msg !== 'ok') res.send({ message: "Unable to delete record" })
        else {
            response.status(200).send({
                message: "Deleted successfully"
            })
        }
    } catch (error) {
        console.log('Error while deleting record', error);
    }
}

const updateItem = async (req, res) => {
    try {
        const id = req.params.id;
        const { productName, price, stock } = req.body;

        const query = updateQuery();
        const updateItemsData = await runQuery(query, [id, stock, price, productName]);
        if (updateItemsData.msg !== 'ok') res.send({ message: "Unable to update record" })
        else {
            res.status(200).send({
                message: "Record updated successfully"
            })
        }
    } catch (error) {
        console.log('Error while updating', error);
    }
}


// queries
const getAllItemsQuery = () => {
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
    unit u ON p.unit_id = u.unit_id`
}

const addQuery = () => {
    return `INSERT INTO product ( product_name, price_per, stock, unit_id) 
            VALUES ($1, $2, $3, $4)`;
}

const updateQuery = () => {
    return `UPDATE product
            SET 
                stock = COALESCE($2, stock),
                price_per = COALESCE($3, price_per),
                product_name = COALESCE($4, product_name)
            WHERE 
                product_id = $1        
    `
}

const deleteQuery = () => {
    return `DELETE FROM product WHERE product_id = $1;`;
}


module.exports = {
    getAllItems, addItem, deleteItem, updateItem
}