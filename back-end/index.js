import express from "express"
import connectDB from "./config/config.js"
import productRoutes from './routes/productRoutes.js'

const app = express()
app.use(express.json())

connectDB()

app.use('/api/products/',productRoutes)


const PORT = process.env.PORT ?? 1234;

app.listen(PORT,() =>{
    console.log(`Server running on: http://localhost:`,PORT)
})  