const path = require('path');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const schedule = require('node-schedule');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const blogRouter = require('./routes/blogRoutes');
const transactionRouter = require('./routes/transactionRoutes');
const auctionBidRouter = require('./routes/auctionBidRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const { SystemSchedule } = require('./controller/auctionBidController');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//middleware
//1) Global middleware
app.use(cors());

app.options('*', cors());
//body parser, reading data from body into req.body
app.use(express.json());
app.use(cookieParser());

//testing middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//serving static files
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/auctionbids', auctionBidRouter);
app.use('/api/v1/transactions', transactionRouter);

// scheduleTime();
SystemSchedule();

if (true) {
  app.use(express.static(`${__dirname}/public/`));
  app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`));
}

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
