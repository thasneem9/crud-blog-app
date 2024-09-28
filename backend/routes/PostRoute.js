import express from 'express'
import { createPost, displayPost,getFeed, getMyPosts,editPost,deletePost,searchPost,likePost} from '../controller/postController.js';
import multer from 'multer';
import path from 'path';
// Configure multer for single file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Specify the directory to save uploaded files
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Save with a unique name
    }
});

const upload = multer({ storage: storage, limits: {
    fileSize: 5 * 1024 * 1024 // 5 MB limit; adjust as needed
  }, });
const router=express.Router();

router.get("/getMyPosts",getMyPosts)
router.get("/getFeed",getFeed)
router.get("/getPost/:postId",displayPost)
router.get("/search",searchPost)
router.post("/editPost/:postId",upload.single("img"),editPost)
router.post("/like/:postId",likePost)
router.delete("/deletePost/:postId",deletePost)


router.post("/createPost",upload.single("img"),createPost)


export default router;