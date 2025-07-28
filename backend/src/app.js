require("dotenv/config");
const express = require("express");
const path = require("path");

const { clerkMiddleware } = require("@clerk/express");
const cors = require("cors");

const { extendResponse } = require("@utils/response.helper");
const { errorHandler } = require("@middlewares/errorHandler.middleware");
const uploadFile = require("@middlewares/fileUpload.middleware");

const { createServer } = require("http");
const initializeSocket = require("@root/lib/socket");

const albumRoutes = require("@routes/album.route");
const userRoutes = require("@routes/user.route");
const authRoutes = require("@routes/auth.route");
const adminRoutes = require("@routes/admin.route");
const songRoutes = require("@routes/song.route");
const statRoutes = require("@routes/stat.route");

const app = express();
app.use(express.json());

const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5001"],
    credentials: true,
  })
);

const distPath = path.resolve(__dirname, "../public/dist");
console.log("Serving static from:", path.join(distPath, "index.html"));

app.use(express.static(distPath));

app.use(extendResponse);
app.use(clerkMiddleware()); // Xác thực trả về req.auth có user
app.use(uploadFile); //Middleware cho phép upload file vào thư mục

app.use("/api/albums", albumRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/stats", statRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.sendFile(path.join(distPath, "index.html"));
});

app.use(errorHandler);
module.exports = httpServer;
