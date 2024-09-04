
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
        console.log("title,contnet:",title,content)
        const newPost= await Post.create({
            title:title,
            text:content,
            author:author,
            postedBy:1

        })
        res.status(200).json({ message: "post creation successful",data:newPost });



        
    } catch (error) {
        res.status(400).json({error})
        
    }
}

export {createPost}