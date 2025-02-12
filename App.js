import express from "express";
import cors from "cors"
import helmet from "helmet";
import { PORT, REQUEST_NUMBER, REQUEST_TIME, URL_ENCODE, WEB_CACHE } from "./App/config/config.js";
import rateLimit from "express-rate-limit";



const app = express()

app.use(cors())
app.use(helmet())

// limite
const limiter = rateLimit({windowMs:REQUEST_TIME,max:REQUEST_NUMBER})
app.use(limiter)

app.use(express.json())
app.use(express.urlencoded({extended:URL_ENCODE}))

app.set("etag",WEB_CACHE)

app.listen(PORT, ()=>{
    console.log(`server running ar http://localhost:${PORT}`)
})