const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./src/db/db")
const authRoutes = require("./src/routes/authRoutes")
const productRoutes = require("./src/routes/productRoutes")
const cartRoutes = require("./src/routes/cartRoutes")
const orderRoutes = require('./src/routes/orderRoutes');
const app = express()

dotenv.config()
connectDB()

app.use(express.json())
app.use(cors({origin:"https://nex-buy-eight.vercel.app",credentials:true}))

app.use("/api",authRoutes)
app.use("/api/product",productRoutes)
app.use("/api/cart",cartRoutes)
app.use('/api/order', orderRoutes);


app.listen(5000,() => {
    console.log("Server running on 5000")
})