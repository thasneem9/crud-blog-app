import express from 'express'
import { signup ,login,editProfile} from '../controller/userController.js';


const router=express.Router();


router.post("/signup",signup)
router.post("/login",login)
router.post("/editProfile",editProfile)

export default router;
