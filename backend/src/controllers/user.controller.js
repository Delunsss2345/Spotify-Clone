const UserService = require('@services/user.service');
const asyncHandler = require('@utils/asyncHandler.util');

const getAllUsers = asyncHandler(async (req , res) => {
        const { userId } = await req.auth(); 
        const users = await UserService.getAllUsers(userId) ; 

        res.success(200 , users) ; 
    }
)
const getMessages = asyncHandler(async (req, res) => {
    const { userId: myId } = req.auth;  // ID người đang đăng nhập
    const { userId } = req.params;      // ID người cần chat

    const messages = await UserService.getMessages(myId, userId);
    console.log(messages);
    res.success(200, messages);
});



module.exports = {getAllUsers , getMessages} ; 