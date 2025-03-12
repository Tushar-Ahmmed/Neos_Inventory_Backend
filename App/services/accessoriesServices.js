import UsersModel from '../models/UsersModel.js';
import AccessoriesModel from './../models/AccessoriesModel.js';
import mongoose from 'mongoose';

export const createAccessoryService = async(req)=>{

    const accessory = req.body
    
    try {
        accessory.Quantity = parseInt(accessory.Quantity)
        accessory.Cat_ID = new mongoose.Types.ObjectId(accessory.Cat_ID)
        await AccessoriesModel.create(accessory)
        return { "status":"Success", message: "Accessory added successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}
export const updateAccessoryService = async(req)=>{

    const accessory = req.body
    const id = new mongoose.Types.ObjectId(req.params.id)
    try {
        accessory.Quantity = parseInt(accessory.Quantity)
        const updateCount = await AccessoriesModel.findByIdAndUpdate(id, accessory)
        if(!updateCount){
            return { "status":"Error", message: "Accessory not found" }
        }
        return { "status":"Success", message: "Accessory updated successfully" }
    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}
export const getAllAccessoriesService = async()=>{

    try {
        const projectStage = {$project:{ Brand: 1, Model: 1, Spec: 1, Quantity: 1,"Category.Title":1,_id:0}}
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

    const user_id = req.params.user_id
    let accArray = req.body.AccessoryIds
    try {
        const userId = new mongoose.Types.ObjectId(user_id)
        accArray = accArray.map((acc)=>{
            return new mongoose.Types.ObjectId(acc)
        })
        const user = await UsersModel.findById(userId)
        accArray = [...user.Accessories, ...accArray]

        const accResult = await AccessoriesModel.updateMany({ _id: { $in: accArray } }, { $inc: { Quantity: -1 } })
        if(!accResult){
            return { "status":"Error", message: "Cannt change in quantity" }
        }

        const result = await UsersModel.findByIdAndUpdate(userId, { Accessories: accArray })
        if(!result){
            return { "status":"Error", message: "Cannot updated in user end" }
        }

        return { "status":"Success", message: "Accessory assigned successfully" }

    } catch (error) {
        return { "status":"Error", message: error.message }
    }

}

export const unassignAccessoryService = async(req)=>{

    const user_id = req.params.user_id
    let accArray = req.body.AccessoryIds
    try {
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
    let id = req.params.id
    let quantity = req.params.quantity
    try {
        quantity = parseInt(quantity)
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
    let id = req.params.id
    let quantity = req.params.quantity
    try {
        quantity = parseInt(quantity)
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