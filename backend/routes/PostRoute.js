import express from 'express'
import { createPost, getFeed} from '../controller/postController.js';


const router=express.Router();

router.get("/getFeed",getFeed)
router.post("/createPost",createPost)


export default router;