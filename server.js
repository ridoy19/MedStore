require('dotenv').config()
const express = require('express');
const morgran = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const MONGO_URI = require('./config/keys');
const cookieParser = require('cookie-parser');

const productRouter = require('./routes/ProductRoute');
const cartRouter = require('./routes/CartRoute');
const userRouter = require('./routes/UserRoute');
const orderRouter = require('./routes/OrderRoute');
const authRouter = require('./routes/AuthRoute');
const categoryRouter = require('./routes/CategoryRoute');
const braintreeRouter = require('./routes/BraintreeRoute');

const app = express();

const PORT = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(morgran('dev'));
app.use(cors());
app.use(cookieParser());


// Routes Middleware
app.use('/api/v1/products', productRouter);
app.use('/api/v1/carts', cartRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/braintree', braintreeRouter);

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// Global Error Handler
app.use((error, req, res, next) => {
    // console.error(error);
    res.status(error.status || 500).send({
        error: {
            name: error.name,
            message: error.message
        }
    });
    console.log(error)
})


mongoose.connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(console.log(`Database connected`)).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server started running on ${PORT}`)
})

//console.log(MONGO_URI);