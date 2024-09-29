
import User from "../Models/User.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../helpers/generateTokenAndCookies.js";
import jwt from "jsonwebtoken";
import sequelize from "../database/database.js";
import { Op } from 'sequelize'; 
import Like from "../models/Like.js";

const createPost=async(req,res)=>{
    const dataReceived=req.body;
    const title=dataReceived.title
    const content=dataReceived.content
    const author=dataReceived.author
    const postedBy=dataReceived.author
    const category=dataReceived.category
    const img = req.file ? req.file.path : null;
    try {
        const token = req.cookies.jwt;
        console.log("postttttttt token",token)
        if (!token) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        console.log("Decoded Token:", decodedToken);

        console.log("Decoded User ID:", userId);

        console.log("title,contnet:",title,content)
        const newPost= await Post.create({
            title:title,
            text:content,
            img:img,
            author:author,
            postedBy:userId,
            category:category

        })
        res.status(200).json({ message: "post creation successful",data:newPost });



        
    } catch (error) {
        res.status(400).json({error})
        
    }
}
const getFeed=async(req,res)=>{
    //get all posts from Post table
    try {
        const posts= await Post.findAll()
        console.log(posts)
        res.status(200).json(posts)
        
    } catch (error) {
        res.status(400).json({message:"posts fetched sucesfully",posts})
        
    }
}

const getMyPosts=async(req,res)=>{
    const token = req.cookies.jwt;
    console.log("postttttttt token",token)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    console.log("Decoded Token:", decodedToken);

    console.log("Decoded User ID:", userId);

   try {
    const posts=await Post.findAll({
        where:{
            postedBy:userId

        }}
        
    )
    res.status(200).json({message:"succesfyl fetching of mypsts",posts})
   } catch (error) {
    res.status(400).json(error)
   }

}
const displayPost=async(req,res)=>{
  
    const token = req.cookies.jwt;
    console.log("postttttttt token",token)
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    console.log("Decoded Token:", decodedToken);

    console.log("Decoded User ID:", userId);

    const {postId}=req.params;
    let likeExists=false;
    try {
        const post= await Post.findOne({
            where:{
                id:postId
                
            }
        })
        const existingLike = await Like.findOne({
            where: { postId, userId },
          });
      
          if (existingLike) {
             likeExists=true
        }
            else{
             likeExists=false
            }
            const likeCount = await Like.count({
                where: { postId },
              });
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        console.log("postttttt",post)
        return res.status(200).json({message:"Post detai;sfetched sucesfully", post,likeExists,likeCount})
    } catch (error) {
        console.error("eror fetching post:",error);
        res.status(500).json({error:'internalserver error'});
        
    }

}

const editPost=async(req,res)=>{
    const title=req.body.title
    const author=req.body.author 
    const content=req.body.content
    const category=req.body.category
    const img = req.file ? req.file.path : null;
    console.log("RECIVED POSTDIT6666:",content,title)
    const {postId}=req.params;
    //console
    try {
        const post= await Post.findByPk(postId)
        post.title=title||post.title
        post.text=content||post.text
        post.img=img||post.img
        post.category=category||post.category
        const updatedPost=await post.save()
        res.status(200).json({content:updatedPost.content,title:updatedPost.title,category:post.category})
        console.log("[[[[[[[ isss:",updatedPost.content)
        
    } catch (error) {
        console.log(error)
        
    }
}
const deletePost=async(req,res)=>{
    const {postId}=req.params;
    try {
        const post=await Post.findByPk(postId)
        post.destroy()
        res.status(200).json("succes")
    } catch (error) {
        res.status(500).json(error)
        
    }
}

const searchPost=async(req,res)=>{
   try {
    const {title}=req.query
    const posts = await Post.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`,  // Case-insensitive LIKE search
          },
        },
      });
      res.status(200).json(posts);
    console.log(posts,"-----------------------")
    
   } catch (error) {
    res.status(500).json(error)
    console.log(error)
    
   }
}

const likePost=async(req,res)=>{
    const {userId}=req.body
    const {postId}=req.params;
    try {
        const existingLike = await Like.findOne({
            where: { postId, userId },
          });
      
          if (existingLike) {
            // If the user has already liked the post, remove the like
            await Like.destroy({
              where: { postId, userId },
            });
      
            // Count total likes for the post after removing
            const likeCount = await Like.count({
              where: { postId },
            });
      
            res.status(200).json({
              message: 'Like removed successfully!',
              likeCount,
              alreadyLiked: false, // User has unliked the post
            });
          } else {
            // If the user hasn't liked the post yet, add the like
            await Like.create({ postId, userId });
      
            // Count total likes for the post after adding
            const likeCount = await Like.count({
              where: { postId },
            });
      
            res.status(200).json({
              message: 'Post liked successfully!',
              likeCount,
              alreadyLiked: true, // User has liked the post
            });
          }
        
       
      } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }

}



export {createPost,getFeed,getMyPosts,displayPost,editPost,deletePost,searchPost,likePost}