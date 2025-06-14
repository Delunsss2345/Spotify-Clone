const User = require("@models/user.model");
const ApiError = require("@utils/apiError.util");
const Message = require("@models/message.model");

class UserService {
    static async getAllUsers (userId) {
        const users = await User.find({clerkId : {$ne : userId}}) ; 
        if(!users) {
            throw new ApiError(404 , 'Không có users') ; 
        }
        return users ; 
    } 

    static async getMessages (myId, userId) {
        console.log(myId , userId)
        const messages = await Message.find({
            $or : [
                {senderId : myId , receiverId : userId} ,
                {senderId : userId , receiverId : myId}  
            ]
        }).sort({ createdAt: 1 }) ; 

        return messages  ; 
    }
}

module.exports = UserService ; 