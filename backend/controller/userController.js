
import User from "../Models/User.js";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from "../helpers/generateTokenAndCookies.js";
import jwt from "jsonwebtoken";

const signup= async (req,res)=>{

const dataReceived=req.body;
const saltRounds=10;
console.log(dataReceived)
try {
    //take password and hash it.
    const password=dataReceived.password
    const hashedPassword=await bcrypt.hash(password,saltRounds)
    //it is conventional in REST APIs, to sendback the same data fprm db once creatig/updating a column in table
    const newUser=await User.create({
        name:dataReceived.name,
        email:dataReceived.email,
        username:dataReceived.username,
        password:hashedPassword

    })
  

        console.log( "newuser:",newUser.id)
        //console.log("JWT Secret:", process.env.JWT_SECRET);
        try {
            generateTokenAndSetCookie(newUser.id, res);
        } catch (error) {
            console.error("Error in token generation:", error);
            return res.status(500).json({ error: "Token generation failed" });
        }
    res.status(200).json({ message: "Signup successful",data:newUser });

    
} catch (error) {
    res.status(400).json({ error});

    
}



}
const login= async (req,res)=>{
    const username=req.body.username;
    const password=req.body.password;

 
    try {
       //get password from db
       console.log("RECEIVED USERNAME:",username)
       console.log("Received body:", req.body);

      
       const user= await User.findOne({
        where:{username:username},
        attributes:['password','id','bio','name']//select only password and id and bio and name
       })
       
       const isMatch = await bcrypt.compare(password, user.password);
       if(isMatch){
        let token;
        try {
           token=generateTokenAndSetCookie(user.id, res);
       //works console.log("+++++++++++",user.id)
        } catch (error) {
            console.error("Error in token generation:", error);
            return res.status(500).json({ error: "Token generation failed" });
        }
        
        res.status(200).json({message:"login sucesful",username:username,isMatch:isMatch,token:token,bio:user.bio,name:user.name,userId:user.id})
        
       }else{
        res.status(400).json({error:"incorect credentials"})
       }
    } catch (error) {
        res.status(400).json({error})
    }
}
const editProfile=async(req,res)=>{
    const name=req.body.name
    const bio=req.body.bio
    const username=req.body.username

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
const user= User.findByPk(userId)

user.name=name
user.bio=bio
user.username=username
updatedUser=await user.save()

//update author in post>>??
res.status(200).json(updatedUser)
        
    } catch (error) {
        console.error(error)
        
    }
}

export {signup,login,editProfile}