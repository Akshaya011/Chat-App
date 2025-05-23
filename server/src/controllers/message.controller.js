import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js"
import User from "../models/user.model.js"
import cloudinary from "cloudinary"

export const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const filteredUsers =await User.find({_id:{$ne:loggedInUser}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "internal server error"})
    }
}
export const getMessages = async (req,res)=>{
    try {
        const {id:userToChatId} = req.params
        const myid = req.user._id;
        // console.log("myid", myid)
        const messages =await Message.find({
            $or:[
                {senderId:myid,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myid},
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "internal server error"})
    }
}
export const sendMessage = async (req,res)=>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;
        let imageUrl;
        if(image){
            const uploadResponse =await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message({
            senderId,receiverId,text,image:imageUrl,
        })
        await newMessage.save();
        //Realtime functionality goes here
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }
        res.status(201).json(newMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json({error : "internal server error"})
    }
}
export const deleteMultipleMessages = async (req, res) => {
  try {
    const { messageIds } = req.body;
    if (!Array.isArray(messageIds)) {
      return res.status(400).json({ message: "Invalid messageIds" });
    }

    await Message.deleteMany({ _id: { $in: messageIds } });

    res.status(200).json({ message: "Messages deleted successfully" });
  } catch (err) {
    console.error("Delete messages error:", err);
    res.status(500).json({ message: "Failed to delete messages" });
  }
};