const User = require("@models/user.model");

class AuthService {
    static async authCallback(user){
        const {id , firstName , lastName , imageUrl} = user ; 
        //Kiểm tra user đã tạo chưa 
        const userFind = await User.findOne({clerkId : id}) ; 

        if(!userFind) {
            //Chưa có thì tạo mới 
            await User.create({
                clerkId : id , 
                fullName : `${firstName || ""} ${lastName || ""}`.trim() ,
                imageUrl 
            })
        }
    }
}

module.exports = AuthService 