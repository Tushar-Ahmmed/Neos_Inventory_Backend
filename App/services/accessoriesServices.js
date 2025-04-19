import UsersModel from '../models/UsersModel.js';
import AccessoriesModel from './../models/AccessoriesModel.js';
import mongoose from 'mongoose';

function haveCommonAccessory(arr1, arr2) {
    return arr2.some(str => arr1.includes(str));
}

export const createAccessoryService = async(req)=>{
    try {
        const accessory = req.body
        accessory.Quantity = parseInt(accessory.Quantity)
        accessory.Cat_ID = new mongoose.Types.ObjectId(accessory.Cat_ID)
        await AccessoriesModel.create(accessory)
        return { "status":"Success", message: "Accessory added successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}
export const updateAccessoryService = async(req)=>{

    try {
        const accessory = req.body
        const id = new mongoose.Types.ObjectId(req.params.id)
        const accessoryData = await AccessoriesModel.findById(id)
        let oldAccessory = {
            Brand: accessoryData.Brand,
            Quantity: accessoryData.Quantity,
        }
        const isEqual = JSON.stringify(oldAccessory) === JSON.stringify(accessory)
        if(isEqual){
            return { "status":"Error", message: "No changes made" }
        }
        accessory.Quantity = parseInt(accessory.Quantity)
        const updateCount = await AccessoriesModel.findByIdAndUpdate(id, accessory)
        if(updateCount.modifiedCount === 0){
            return { "status":"Error", message: "Accessory not Updated" }
        }
        return { "status":"Success", message: "Accessory updated successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}
export const getAllAccessoriesService = async()=>{

    try {
        const projectStage = {$project:{ Brand: 1, Model: 1, Spec: 1, Quantity: 1,"Category.Title":1, _id:1}}
        const LookupStage = {
            $lookup: {
              from: "accessoriescategories",       // The name of the collection to join with
              localField: "Cat_ID", // Field from the input documents (this collection)
              foreignField: "_id", // Field from the other collection to match
              as: "Category"              // The name of the array to add to the documents
            }
          }
          const unwindStage = { $unwind: "$Category" }
        const data = await AccessoriesModel.aggregate([LookupStage,unwindStage,projectStage])
        return { "status":"Success", data }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}

export const getAccessoryByIdService = async(id)=>{

    try {
        const accessory = await AccessoriesModel.findById(id)
        if(!accessory){
            return { "status":"Error", message: "Accessory not found" }
        }
        return { "status":"Success", accessory }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}

export const getAccessoryByCatService = async(req)=>{
    
    try {
        const catId = new mongoose.Types.ObjectId(req.params.id)
        const project = { Brand: 1, Model: 1, Spec: 1, Quantity: 1, _id: 0 }
        const matchStage = { $match: { Cat_ID: catId } }
        const accessories = await AccessoriesModel.aggregate([matchStage, { $project: project }])
        if(!accessories){
            return { "status":"Error", message: "Accessories not found" }
        }
        return { "status":"Success", accessories }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}

export const deleteAccessoryService = async(req)=>{

    try {
        const id = new mongoose.Types.ObjectId(req.params.id)
        const deleterResult = await AccessoriesModel.findByIdAndDelete(id)
        if(!deleterResult){
            return { "status":"Error", message: "Accessory not found" }
        }
        return { "status":"Success", message: "Accessory deleted successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}

export const assignAccessoryService = async(req)=>{

    try {
        const user_email = req.params.user_email
        let accArray = req.body.AccessoryIds

        const user = await UsersModel.findOne({Email:user_email})
        if(!user){
            return { "status":"Error", message: "User Not Found" }
        }

        if(haveCommonAccessory(user.Accessories, accArray)){
            return { "status":"Error", message: "You are trying to assign such an item which is already assigned!!" }
        }

        accArray = accArray.map((acc)=>{
            return new mongoose.Types.ObjectId(acc)
        })
        
        accArray = [...user.Accessories, ...accArray]

        const result = await UsersModel.findByIdAndUpdate(user._id, { Accessories: accArray })
        
        if(!result){
            return { "status":"Error", message: "Cannot updated in user end" }
        }
        
        const accResult = await AccessoriesModel.updateMany({ _id: { $in: accArray } }, { $inc: { Quantity: -1 } })
        if(!accResult){
            
            return { "status":"Error", message: "Cannot change in quantity" }
        }

        return { "status":"Success", message: "Accessories assigned successfully" }

    } catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const unassignAccessoryService = async(req)=>{

    try {
        const user_id = req.params.user_id
        let accArray = req.body.AccessoryIds
        const userId = new mongoose.Types.ObjectId(user_id)
        accArray = accArray.map((acc)=>{
            return new mongoose.Types.ObjectId(acc)
        })
        const user = await UsersModel.findById(userId)


        const accResult = await AccessoriesModel.updateMany({ _id: { $in: accArray } }, { $inc: { Quantity: 1 } })
        if(!accResult){
            return { "status":"Error", message: "Cannt change in quantity" }
        }

        function findDifference(arr1, arr2) {
            const diff1 = arr1.filter(id => !arr2.some(id2 => id.equals(id2)));
            return diff1
        }

        let accArray2 = findDifference(user.Accessories, accArray)
       
        const result = await UsersModel.findByIdAndUpdate(userId, { Accessories: accArray2 })
        if(!result){
            return { "status":"Error", message: "Cannot updated in user end" }
        }

        return { "status":"Success", message: "Accessory unassigned successfully" }

    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}

export const increaseAccessoryService = async(req)=>{
    try {
        let id = req.params.id
        let quantity = req.params.quantity
        quantity = parseInt(quantity)
        if(quantity < 0){
            return { "status":"Error", message: "Quantity cannot be negative" }
        }
        if(quantity === 0){
            return { "status":"Error", message: "Quantity cannot be zero" }
        }

        id = new mongoose.Types.ObjectId(id)


        const result = await AccessoriesModel.findByIdAndUpdate(id, { $inc: { Quantity: quantity } })
        if(!result){
            return { "status":"Error", message: "Accessory not found" }
        }
        return { "status":"Success", message: "Quantity increased successfully" }   
    }catch (error) {
        return { "status":"Error", message: error.message }
    }
}

export const decreaseAccessoryService = async(req)=>{
    try {
        let id = req.params.id
        let quantity = req.params.quantity
        quantity = parseInt(quantity)
        if(quantity < 0){
            return { "status":"Error", message: "Quantity cannot be negative" }
        }
        if(quantity === 0){
            return { "status":"Error", message: "Quantity cannot be zero" }
        }

        const accessory = await AccessoriesModel.findById(id)
        if(accessory){
            if(parseInt(accessory.Quantity) < quantity){
                return { "status":"Error", message: "Decrease quantity is higher than existing" }
            }
        }

        id = new mongoose.Types.ObjectId(id)
        const result = await AccessoriesModel.findByIdAndUpdate(id, { $inc: { Quantity: -quantity } })
        if(!result){
            return { "status":"Error", message: "Accessory not found" }
        }
        return { "status":"Success", message: "Quantity decreased successfully" }   
    }catch (error) {
        return { "status":"Error", message: error.message }
    }
}
export const getAccessoriesDetailsService = async(req)=>{
    try {
        let accessories = req.params.accessories
        accessories = accessories.split(",")
        if(!accessories || accessories.length === 0){
            return { "status":"Error", message: "No accessories found" }
        }
        accessories = accessories.map((acc)=>{
            return acc.trim()
        })
        accessories = accessories.filter((acc)=>{
            return acc !== ""
        })
        accessories = accessories.map((acc)=>{
            return new mongoose.Types.ObjectId(acc)
        })
        const projectStage = {$project:{ Brand: 1, Model: 1, Title:"$Category.Title", _id:1}} 
        const LookupStage = {
            $lookup: {
              from: "accessoriescategories",
              localField: "Cat_ID",
              foreignField: "_id", 
              as: "Category"              
            }
          }
        const unwindStage = { $unwind: "$Category" }
        const matchStage = { $match: { _id: { $in: accessories } } }
        const data = await AccessoriesModel.aggregate([matchStage,LookupStage,unwindStage,projectStage])

        if(!data){
            return { "status":"Error", message: "Accessories not found" }
        }
        return { "status":"Success", data }

    }catch (error) {
        return { "status":"Error", message: error.message }
    }
}