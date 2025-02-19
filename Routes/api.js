import express from "express"
import { addDevice, deviceinfo, assignDevice, unassignDevice} from "../App/controllers/deviceController.js"
import { addUser, userinfo,addUserDescription,userFullInfo,updateUser,updateUserDescription, deleteUser } from "../App/controllers/userController.js"
import { createAccessory,updateAccessory,getAllAccessories,getAccessoryById,getAccessoryByCat, deleteAccessory,assignAccessory, unassignAccessory } from "../App/controllers/accessoriesController.js"
import { createCategory,updateCategory, deleteCategory } from "../App/controllers/categoryController.js"

const router = express.Router()


// Device Controller
router.get("/deviceinfo/:serial", deviceinfo)
router.post("/adddevice/", addDevice)
router.patch("/assigndevice", assignDevice)
router.patch("/unassigndevice/:serial", unassignDevice)


// Accessories controller
router.get("/allaccessories", getAllAccessories)
router.get("/getaccessorybyid/:id", getAccessoryById)
router.get("/getaccessorybycat/:id", getAccessoryByCat)
router.post("/createaccessory/", createAccessory)
router.patch("/updateaccessory/:id", updateAccessory)
router.delete("/deleteaccessory/:id", deleteAccessory)
router.patch("/assignaccessory/:user_id", assignAccessory)
router.patch("/unassignaccessory/:user_id", unassignAccessory)


// user Controller
router.post("/adduser/", addUser)
router.put("/updateuser/:email", updateUser)
router.get("/deleteuser/:email", deleteUser)
router.post("/adduserdescription/:email", addUserDescription)
router.put("/updateuserdescription/:email", updateUserDescription)
router.get("/userinfo/:email", userinfo)
router.get("/userfullinfo/:email", userFullInfo)

// Category Controller
router.post("/createcategory", createCategory)
router.put("/updatecategory/:id", updateCategory)
router.delete("/deletecategory/:id", deleteCategory)





router.get("/",(req,res)=>{
    res.end("Request comming successfully")
})

export default router