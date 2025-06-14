const { clerkClient } = require('@clerk/clerk-sdk-node');
const protectRoute = async (req , res , next) => {
    const {userId} = await req.auth() ; 
    if(!userId) {
       return res.error(401 , 'Bạn cần phải đăng nhập')
    }
    next() ;
}

const requireAdmin = async(req , res , next) => {
    try {
        const {userId} = await req.auth() ; 
        const currentUser = await clerkClient.users.getUser(userId) ;
        const email = currentUser.emailAddresses[0]?.emailAddress
        const isAdmin = process.env.ADMIN_EMAIL === email;
 //?. để không lỗi
        if(!isAdmin) {
          return res.error(403 , 'Chỉ admin mới dùng được')
        }

        next() ; 
    }
    catch(error) {
        console.log('Error: ' + error) ; 
        next(error) ; 
    }
}

module.exports = {protectRoute , requireAdmin}