import express from 'express'
import { createPost, getFeed, getMyPosts} from '../controller/postController.js';


const router=express.Router();

router.get("/getFeed",getFeed)
router.get("/getMyPosts",getMyPosts)
router.post("/createPost",createPost)


export default router;