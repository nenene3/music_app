import * as controller from "../controllers/userController.js";
import { protect } from "../middlewares/authHandler.js";
import express from "express";
const router = express.Router();

router.post("/logout", controller.logOut);
router.post("/login", controller.login);
router.post("/register", controller.register);

router.get("/protectData",protect,(req,res)=>{
    console.log('got it')
    res.json(req.user)
});

export default router;
