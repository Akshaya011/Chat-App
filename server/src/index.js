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
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173",
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