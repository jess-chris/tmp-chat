const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const { setTokenCookie, restoreChat } = require('../../utils/auth');
const { Chat } = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  
  
  res.json({ test: "chat api route!" });
  

}));

router.post('/', asyncHandler(async (req, res, next) => {

  const { password, confirmPassword, duration } = req.body;

  // console.log(req.body)

  // console.log(Object.keys(req.req))

  // console.log(req.req.body)
  // if (password !== confirmPassword) {

  // }

  console.log(duration)

}));

module.exports = router;