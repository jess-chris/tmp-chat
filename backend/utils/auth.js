const jwt = require('jsonwebtoken');
const { jwtConfig } = require('../config');
const { Chat } = require('../db/models');

const { secret, expiresIn } = jwtConfig;

// Sends a JWT Cookie
const setTokenCookie = (res, chat) => {
  // Create the token.
  const chatUser = {
    id: chat.chat_id
  };
  const token = jwt.sign(
    { data: chatUser },
    secret,
    { expiresIn: parseInt(expiresIn) } // 604,800 seconds = 1 week
  );

  const isProduction = process.env.NODE_ENV === "production";

  // Set the token cookie
  res.cookie('token', token, {
    maxAge: expiresIn * 1000, // maxAge in milliseconds
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && "Lax"
  });

  return token;
};

const restoreChat = (req, res, next) => {
  // token parsed from cookies
  const { token } = req.cookies;
  req.chat = null;

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();
    }

    try {
      const { chat_id } = jwtPayload.data;
      req.chat = await Chat.findOne({
        where: {
          chat_id: chat_id
        }
      }
      );
    } catch (e) {
      res.clearCookie('token');
      return next();
    }

    if (!req.chat) res.clearCookie('token');

    return next();
  });
};


const requireAuth = function (req, _res, next) {
  if (req.chat) return next();

  const err = new Error('Not Found');
  err.title = 'Not Found';
  err.errors = { message: 'Not Found' };
  err.status = 404;
  return next(err);
}

module.exports = { setTokenCookie, restoreChat, requireAuth };
