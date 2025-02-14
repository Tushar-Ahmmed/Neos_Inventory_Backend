import express from "express"
import { addDevice, deviceinfo} from "../App/controllers/deviceController.js"
import { addUser, userinfo,addUserDescription } from "../App/controllers/userController.js"



const router = express.Router()


// Device Controller
router.get("/deviceinfo/:serial", deviceinfo)
router.post("/adddevice/", addDevice)

// user Controller
router.post("/adduser/", addUser)
router.get("/userinfo/:email", userinfo)
router.post("/adduserdescription/:email", addUserDescription)



router.get("/",(req,res)=>{
    res.end("Request comming successfully")
})

export default router