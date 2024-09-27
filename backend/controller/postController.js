
import User from "../Models/User.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../helpers/generateTokenAndCookies.js";
import jwt from "jsonwebtoken";



const createPost=async(req,res)=>{
    const dataReceived=req.body;
    const title=dataReceived.title
    const content=dataReceived.content
    const author=dataReceived.author
    const postedBy=dataReceived.author
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
            postedBy:userId

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
  

    const {postId}=req.params;
    try {
        const post= await Post.findOne({
            where:{
                id:postId
                
            }
        })
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        console.log("postttttt",post)
        return res.status(200).json({message:"Post detai;sfetched sucesfully", post})
    } catch (error) {
        console.error("eror fetching post:",error);
        res.status(500).json({error:'internalserver error'});
        
    }

}

const editPost=async(req,res)=>{
    const title=req.body.title
    const author=req.body.author 
    const content=req.body.content
    console.log("RECIVED POSTDIT6666:",content,title)
    const {postId}=req.params;
    //console
    try {
        const post= await Post.findByPk(postId)
        post.title=title||post.title
        post.text=content||post.text
        const updatedPost=await post.save()
        res.status(200).json({content:updatedPost.content,title:updatedPost.title})
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

export {createPost,getFeed,getMyPosts,displayPost,editPost,deletePost}