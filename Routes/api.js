import express from "express"
import { addDevice, deviceinfo, assignDevice, unassignDevice,updateDevice,deleteDevice,allDevices,allUnassignedDevices} from "../App/controllers/deviceController.js"
import { addUser, userinfo,addUserDescription,userFullInfo,updateUser,updateUserDescription, deleteUser,allUsers } from "../App/controllers/userController.js"
import { createAccessory,updateAccessory,getAllAccessories,getAccessoryById,getAccessoryByCat, deleteAccessory,assignAccessory, unassignAccessory,increaseAccessory,decreaseAccessory } from "../App/controllers/accessoriesController.js"
import { createCategory,updateCategory, deleteCategory,allCategories } from "../App/controllers/categoryController.js"
import { administratorCreate,administratorDelete,updateBySuperAdmin,findAdmin,updateProfile,changePassword } from "../App/controllers/administratorController.js"
import { tokenCreate } from "../App/controllers/tokenCreateController.js"
import { tokenVerifyMiddleware } from "../App/middlewares/tokenVerifyMiddleware.js"
import { superAdminVerifyMiddleware } from "../App/middlewares/superadminverifyMiddleware.js"







const router = express.Router()


// Device Controller
router.get("/deviceinfo/:serial", tokenVerifyMiddleware, deviceinfo)
router.get("/alldevices/", tokenVerifyMiddleware, allDevices)
router.get("/allunassigedndevices/", tokenVerifyMiddleware, allUnassignedDevices)
router.post("/adddevice/", tokenVerifyMiddleware, addDevice)
router.patch("/assigndevice", tokenVerifyMiddleware, assignDevice)
router.patch("/unassigndevice/:serial", tokenVerifyMiddleware, unassignDevice)
router.patch("/updatedevice/:serial", tokenVerifyMiddleware, updateDevice)
router.delete("/deletedevice/:serial", superAdminVerifyMiddleware, deleteDevice)


// Accessories controller
router.get("/allaccessories", tokenVerifyMiddleware, getAllAccessories)
router.get("/getaccessorybyid/:id", tokenVerifyMiddleware, getAccessoryById)
router.get("/getaccessorybycat/:id", tokenVerifyMiddleware, getAccessoryByCat)
router.post("/createaccessory/", tokenVerifyMiddleware,  createAccessory)
router.patch("/updateaccessory/:id",tokenVerifyMiddleware, updateAccessory)
router.delete("/deleteaccessory/:id",superAdminVerifyMiddleware, deleteAccessory)
router.patch("/assignaccessory/:user_id", tokenVerifyMiddleware,  assignAccessory)
router.patch("/unassignaccessory/:user_id", tokenVerifyMiddleware, unassignAccessory)
router.patch("/increaseaccessory/:id/:quantity", tokenVerifyMiddleware, increaseAccessory)
router.patch("/decreaseaccessory/:id/:quantity", superAdminVerifyMiddleware, decreaseAccessory)


// user Controller
router.get("/allusers/", tokenVerifyMiddleware, allUsers)
router.post("/adduser/", tokenVerifyMiddleware, addUser)
router.put("/updateuser/:email", tokenVerifyMiddleware, updateUser)
router.post("/adduserdescription/:email", tokenVerifyMiddleware, addUserDescription)
router.put("/updateuserdescription/:email",tokenVerifyMiddleware, updateUserDescription)
router.get("/userinfo/:email", tokenVerifyMiddleware, userinfo)
router.get("/userfullinfo/:email", tokenVerifyMiddleware, userFullInfo)
router.delete("/deleteuser/:email",superAdminVerifyMiddleware, deleteUser)

// Category Controller
router.get("/allcategories/", tokenVerifyMiddleware, allCategories)
router.post("/createcategory/", tokenVerifyMiddleware, createCategory)
router.put("/updatecategory/:id", tokenVerifyMiddleware, updateCategory)
router.delete("/deletecategory/:id",superAdminVerifyMiddleware, deleteCategory)


// Token Controller
router.post("/login", tokenCreate)

// administrator
router.post("/createadmin", superAdminVerifyMiddleware, administratorCreate)
router.get("/findadmin/:email", superAdminVerifyMiddleware, findAdmin)
router.delete("/deleteadmin/:email", superAdminVerifyMiddleware, administratorDelete)
router.put("/updatebysuperadmin/:email", superAdminVerifyMiddleware, updateBySuperAdmin)
router.patch("/editprofile/", tokenVerifyMiddleware, updateProfile)
router.patch("/changepassword/", tokenVerifyMiddleware, changePassword)

export default router