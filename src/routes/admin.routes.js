const { Router } = require('express');
const { getAllItems, addItem, updateItem, deleteItem } = require('../controllers/adminController');

const adminRouter = Router();

adminRouter.get('/items', getAllItems);
adminRouter.post('/items', addItem);
adminRouter.put('/items/:id', updateItem);
adminRouter.delete('/items/:id', deleteItem);

module.exports = adminRouter;