import express from "express"
import {signup,login} from "../controller/authController.js"
const router=express.Router();
router.post("/signup",signup);
router.get("/login",login);
export default router;