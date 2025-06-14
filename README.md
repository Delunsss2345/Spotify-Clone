# Spotify Clone 🎵

Clone Spotify **FullStack** với **Node.js**, **MongoDB**, **Cloudinary**, **Clerk**, **Socket.Io** , **TypeScript** và **React (Vite)**.

## ⚙ Yêu cầu

- Node.js >= 16
- NPM >= 8
- MongoDB Atlas (hoặc MongoDB local)
- Cloudinary account
- Clerk account


### 🌱 Tạo file môi trường
```bash
Env  
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5001
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_EMAIL=your_admin_email
NODE_ENV=development
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

Env frontend
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

```

### Chạy dự án
```bash
npm run build
npm run start --prefix backend
```



