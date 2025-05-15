import express from "express"
const router = express.Router()
import { deleteMultipleMessages, getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

router.get("/users",protectRoute,getUsersForSidebar)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.post('/delete-multiple', protectRoute, deleteMultipleMessages);


export default router