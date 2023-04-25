const router = require('express').Router();
const usersRouter = require('./user');
const categoriesRouter = require('./categories');
const foodRouter = require('./food');
const CustomerRouter = require('./customer');
const Authentication = require('../middlewares/authentication');

router.use('/users', usersRouter)
router.use('/customer', CustomerRouter)
router.use(Authentication.user)
router.use('/categories', categoriesRouter)
router.use('/food', foodRouter)

module.exports = router