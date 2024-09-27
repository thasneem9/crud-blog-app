import express from 'express'
import { createPost, displayPost,getFeed, getMyPosts,editPost,deletePost} from '../controller/postController.js';


const router=express.Router();

router.get("/getMyPosts",getMyPosts)
router.get("/getFeed",getFeed)
router.get("/getPost/:postId",displayPost)
router.post("/editPost/:postId",editPost)
router.delete("/deletePost/:postId",deletePost)


router.post("/createPost",createPost)


export default router;