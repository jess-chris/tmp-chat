const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const sessionRouter = require('./session.js');
const chatRouter = require('./chat.js');
const { restoreChat } = require("../../utils/auth.js");

// router.use(restoreChat);

router.use('/session', sessionRouter);
router.use('/chat', chatRouter);

router.get('/', asyncHandler(async (req, res) => {
  
  
  res.json({ test: "it works!" });
  

}));

module.exports = router;