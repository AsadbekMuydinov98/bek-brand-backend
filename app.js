/* The code you provided is a basic setup for a Node.js application using Express framework along with
MongoDB (mongoose) for database operations. Here's a breakdown of the code: */
require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error.middleware')
const cors = require('cors')

const app = express()
const allowedOrigins = ['http://localhost:5173', 'https://bek-brand.vercel.app', 'https://uzbekbrand.pages.dev', 'https://www.bekbrands.com', 'https://bekbranduz.pages.dev'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// app.use(cors())
app.use(express.json())
app.use(cookieParser({}))
app.use(express.static('static'))
app.use(fileUpload({}))

// Routes
app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/product', require('./routes/product.route'))
app.use('/api/category', require('./routes/category.route'))
app.use('/api/color', require('./routes/color.route'))
app.use('/api/brand', require('./routes/brand.route'))
app.use('/api/cart', require('./routes/cart.route'))

app.use(errorMiddleware)

const PORT = process.env.PORT || 8080

const bootstrap = async () => {
	try {
		await mongoose.connect(process.env.DB_URL).then(() => console.log('Connected DB'))

		app.listen(PORT, () => console.log(`Listening on - http://localhost:${PORT}`))
	} catch (error) {
		console.log(`Error connecting with DB: ${error}`)
	}
}

bootstrap()
