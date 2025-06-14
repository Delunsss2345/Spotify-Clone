const AuthService = require('@services/auth.service') ; 

const asyncHandler = require('@utils/asyncHandler.util')

const authCallback = asyncHandler(async (req , res) => {
        await AuthService.authCallback(req.body) ; 
        res.success(200) ; 
})



module.exports = authCallback ; 