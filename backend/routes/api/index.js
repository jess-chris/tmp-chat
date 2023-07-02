const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const { restoreChat } = require("../../utils/auth.js");

router.use(restoreChat);

router.use('/session', sessionRouter);

module.exports = router;