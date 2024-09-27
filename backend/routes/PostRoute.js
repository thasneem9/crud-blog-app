import express from 'express'
import { createPost, displayPost,getFeed, getMyPosts,editPost} from '../controller/postController.js';


const router=express.Router();

router.get("/getMyPosts",getMyPosts)
router.get("/getFeed",getFeed)
router.get("/getPost/:postId",displayPost)
router.post("/editPost/:postId",editPost)


router.post("/createPost",createPost)


export default router;