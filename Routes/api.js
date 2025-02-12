import express from "express"



const router = express.Router()


// Device Controller
router.get("/deviceinfo/:serial",(req,res)=>{
    res.end("Request comming successfully")
})

router.get("/",(req,res)=>{
    res.end("Request comming successfully")
})

export default router