const { Router } = require('express');
const adminRouter = require('./admin.routes');
const userRouter = require('./user.routes');
const isAdmin = require('../middleware/admin.middleware');

const routes = Router();

routes.use('/admin', isAdmin, adminRouter);
routes.use('/user', userRouter);

module.exports = routes;