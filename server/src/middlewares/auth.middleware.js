import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies in protectRoute:", req.cookies);
    const token =req.cookies.jwt;
    if(!token)return res.status(401).json({ message: "Unauthorized - No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized - User not found" });
    }
    // console.log(token)
    const newuser = {
      token,
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
    };
    req.user = newuser;
    next();
  } catch (err) {
    console.error("Error in protectRoute middleware: ", err.message);
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};
