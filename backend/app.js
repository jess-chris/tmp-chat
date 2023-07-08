// const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('./routes');

const app = express();

const { environment } = require('./config');
const isProduction = environment === 'production';

app.use(logger('dev'));

app.use(cookieParser());



app.use(express.json());
app.use(express.urlencoded({ extended: false }));


if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

// app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());

// helmet helps set a variety of headers to better secure your app
app.use(
  helmet.crossOriginResourcePolicy({ 
    policy: "cross-origin" 
  })
);



app.use(routes);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = ["The requested resource couldn't be found."];
  err.status = 404;
  next(err);
});

// error handler
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

module.exports = app;
