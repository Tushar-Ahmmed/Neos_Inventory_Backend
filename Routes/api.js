import express from "express"
import { addDevice, deviceinfo, assignDevice} from "../App/controllers/deviceController.js"
import { addUser, userinfo,addUserDescription,userFullInfo,updateUser,updateUserDescription, deleteUser } from "../App/controllers/userController.js"



const router = express.Router()


// Device Controller
router.get("/deviceinfo/:serial", deviceinfo)
router.post("/adddevice/", addDevice)
router.patch("/assigndevice/:serial/:email", assignDevice)

// user Controller
router.post("/adduser/", addUser)
router.post("/adduserdescription/:email", addUserDescription)
router.get("/userinfo/:email", userinfo)
router.get("/userfullinfo/:email", userFullInfo)
router.put("/updateuser/:email", updateUser)
router.put("/updateuserdescription/:email", updateUserDescription)
router.get("/deleteuser/:email", deleteUser)




router.get("/",(req,res)=>{
    res.end("Request comming successfully")
})

export default router