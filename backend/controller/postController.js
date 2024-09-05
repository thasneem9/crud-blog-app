
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

export {createPost,getFeed}