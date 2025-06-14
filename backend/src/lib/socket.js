const {Server} = require('socket.io')
const Message = require('@models/message.model') 


module.exports = initializeSocket = (server) => {
    const io = new Server(server , {
        cors : {
            origin : "http://localhost:3000" , 
            credentials: true
        }
    })

    const userSocket = new Map() ;  // {userId : socketid}
    const userActivities = new Map()  ; // {userId : activity}

    io.on("connection" , (socket) => {
        //User đang online
        socket.on("user_connected" , (userId) => {
            userSocket.set(userId , socket.id) ; // Lưu socket.id theo userId
            userActivities.set(userId , "Idle") ; // Gán trạng thái mặc định
 
            io.emit("user_connected" , userId) ;  //gửi cho tất cả (kể cả chính user này)

            socket.emit("user_online" , Array.from(userSocket.keys())) ;  // Gửi riêng cho user mới danh sách online

            io.emit("activities" , Array.from(userActivities.entries())) ; // Gửi cho tất cả danh sách trạng thái
        })

        //Cập nhập hoạt động
        socket.on("update_activity" , ({userId , activity}) => {
            userActivities.set(userId , activity);
            io.emit("activity_updated" , {userId , activity}) ; 
        })

        //Gửi tin nhắn riêng
        socket.on("send_message" , async (data) => {
            try {
                const {senderId , receiverId , content} = data ; 

                const message = await Message.create({
                    senderId , receiverId , content 
                })

                const receiverSocketId = userSocket.get(receiverId) ; 
                if(receiverSocketId) {
                    io.to(receiverSocketId).emit("receive_message" , message) ;  //gui rieng theo id cho người nhận
                }

                socket.emit("message_sent" , message) ; // gui rieng cho nguoi gui để biết gửi thành công
            }
            catch(error) {
                console.error("Message error" , error) ; 
                socket.emit("message_error", error.message) ; 
            }
        })

        //Ngắt kết nối 
        socket.on("disconnect" , () => {
            let disconnectedUserId ; 
            for(const [userId , socketId] of userSocket.entries()) {
                if(socketId === socket.id) {
                    disconnectedUserId = userId;
                    userSocket.delete(userId) ;
                    userActivities.delete(userId) ; 
                    break ; 
                }
            }
            if(disconnectedUserId) {
                io.emit("user_disconnected" , disconnectedUserId) ;  //io là gửi tất cả socket.io là gửi riêng
            }
        })
    })
}