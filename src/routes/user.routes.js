const { Router } = require('express');
const { getAllAvailableItems, createOrder } = require('../controllers/userController');

const userRouter = Router();

userRouter.get('/items', getAllAvailableItems);
userRouter.post('/order', createOrder);


module.exports = userRouter;