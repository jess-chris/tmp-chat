// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const { setTokenCookie, restoreChat } = require('../../utils/auth');
const { Chat } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res, next) => {

  const { chat_id, password } = req.body;

  const chat = Chat.findOne({ where: { chat_id: chat_id }});

  if (!chat || !bcrypt.compareSync(password, chat.pw_hash.toString())) {

    const err = new Error('Invalid chat');
    err.status = 401;
    err.title = 'Invalid chat';
    err.errors = { default: 'Invalid chat.'}
    return next(err);
  }

  const validChat = {
    id: chat.chat_id
  };

  await setTokenCookie(res, validChat);

  return res.json({ chat: validChat});

});

module.exports = router;