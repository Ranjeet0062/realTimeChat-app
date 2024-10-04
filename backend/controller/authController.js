import User from "../model/user.modal.js";
import Profile from "../model/profile.modal.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const signup = async (req, res) => {
    try {
      console.log(req);
      const { firstName, lastName, password, username} = req.body;
      if (!firstName || !lastName || !password || !username) {
        res.status(400).json({
          success: false,
          message: `please fill all the details`,
        });
        return;
      }
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "your password is to short please provide at least 6 charcter password ",
        });
      }
      const userexist = await User.findOne({ username });
  
      if (userexist) {
        return res.status(400).json({
          success: false,
          message: `user already exist please login `,
        });
      }
      let hashedpassword;
      try {
        hashedpassword = await bcrypt.hash(password, 10);
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: `error occurred while hashing password and error is ${error}`,
        });
      }
      let profile;
      try {
        profile = await Profile.create({
          profilename: `${firstName} ${lastName}`,
        });
      } catch (error) {
        console.error("Error occurred while creating profile:", error);
        return res.status(400).json({
          success: false,
          message: `Error occurred while creating profile.`,
        });
      }
  
      const user = await User.create({
        firstName,
        lastName,
        username,
        password: hashedpassword,
        profile,
      });
      user.password = undefined;
      return res.status(200).json({
        success: true,
        message: "User Created Successfully",
        data: user,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
        return res.status(400).json({
          success: false,
          message: `Email is already in use. Please use a different email.`,
        });
      } else if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.username
      ) {
        return res.status(400).json({
          success: false,
          message: `Username is already taken. Please choose another username.`,
        });
      } else {
        console.error("Unexpected error occurred:", error);
        return res.status(400).json({
          success: false,
          message: `Something went wrong while signing up. and error is ${err}`,
        });
      }
    }
  };
export const login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide both username or email and password",
        });
      }
  
      const user = await User.findOne({username: username});
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User does not exist. Please check Username or Email",
        });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password. Please try again.",
        });
      }
  
      const payload = {
        userid: user._id,
        username: user.username,
      };
  
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
  
      user.token = token;
      user.password = undefined;
  
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none"
      };
  
      // Set token in a cookie
      res.cookie("token", token, options);
  
      // Set the token in the "Authorization" header (optional)
      res.set("Authorization", `Bearer ${token}`);
  
      return res.status(200).json({
        success: true,
        token,
        user,
        message: "User logged in successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: `Something went wrong while logging in: ${error.message}`,
      });
    }
  };
  