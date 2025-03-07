import mongoose, { mongo } from "mongoose"

export const PORT = 4999
// export const database = "mongodb+srv://tushar:123@e-commerce.nwu96.mongodb.net/E-Commerce?retryWrites=true&w=majority&appName=E-Commerce"
export const database = "mongodb+srv://tushar:123@e-commerce.nwu96.mongodb.net/NeosCoderInventory?retryWrites=true&w=majority&appName=E-Commerce"
export const WEB_CACHE = false
export const URL_ENCODE = true
export const MAX_JSON_SIZE = "10MB"

export const default_user_id = new mongoose.Types.ObjectId("67af3b12a55a523a84f93b73")

export const JWT_KEY = "ASDFG234543"
export const JWT_EXPIRE_TIME = 10*24*60*60 //10 Daya into seconds


export const REQUEST_TIME = 20 * 60 * 1000 //20 minutes in miliseconds
export const REQUEST_NUMBER = 10*20 //per minute 10 requests

export const EMAIL_HOST = "mail.teamrabbil.com"
export const EMAIL_port = 25
export const EMAIL_SECURITY = false
export const EMAIL_USER = "info@teamrabbil.com"
export const EMAIL_PASS = "`sR4[bhaC[Qs"
export const EMAIL_UN_AUTH = false