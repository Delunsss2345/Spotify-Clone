const mongoose = require('mongoose') ; 
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL) ; 
        console.log(conn.connection.name) ;
    }
    catch (error) {
        console.error(error) ; 
    }
}

module.exports = connectDB ; 
