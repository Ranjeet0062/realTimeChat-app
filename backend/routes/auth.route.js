import express from "express"
import {signup,login,checkmiddleware} from "../controller/authController.js"
import { auth } from "../middleware/auth.js";
const router=express.Router();
router.post("/signup",signup);
router.post("/login",login);
router.get("/checkmiddleware",auth ,checkmiddleware);
export default router;