import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
import { connectDb } from "./lib/db.js"
import cookieParser from "cookie-parser";
import { app,server } from "./lib/socket.js"


connectDb()
dotenv.config()
app.get("/", (req, res) => {
  res.send("✅ Chat App Backend is running!");
});

const PORT = process.env.PORT||5001;

app.use(cors({
    origin: ["https://chatapp-orpin-tau.vercel.app"],
    credentials: true,
  }));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser())
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/auth" , authRoutes)
app.use("/api/messages" , messageRoutes)
server.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`);
    
})