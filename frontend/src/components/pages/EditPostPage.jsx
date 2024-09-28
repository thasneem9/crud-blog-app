// src/EditorComponent.js
import React, { useState } from "react";
import './editor.css'
import { Button } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { postAtom } from "../atoms/postAtom.js";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

const EditPostPage = () => {
    const user = useRecoilValue(userAtom);
   /*  const post = useRecoilValue(postAtom); */
    const [post,setPost]=useRecoilState(postAtom)
    const {postId}=useParams();
    const [image,setImage]=useState(null)
    console.log(postId)
    //that for intital values
    console.log("++++",user)
    console.log("++++dataname",user.username)
    
  //we have to go to /editpost/postid..it works
  //send to backend
  

    
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [alignment, setAlignment] = useState("left");

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category,setCategory]=useState('');

  
   


  useEffect(()=>{
    const fetchPostDetails=async(req,res)=>{
        try {
            const res=await fetch(`/api/posts/getPost/${postId}`,{
                method:'GET',
                headers:{'Content-Type':'application/json'},
    
            })
            const postDetails=await res.json()
            if(postDetails){
            console.log("myy veryown post details lol",postDetails)
            setPost({
                title:postDetails.post.title,
                content:postDetails.post.content

            })
            console.log(post)
            setTitle(postDetails.post.title);
            setContent(postDetails.post.text);
            }
            
        } catch (error) {
            console.error(error)
            
        }
      }
      fetchPostDetails()
    
},[postId])
const author=user.username
const formData = new FormData();
formData.append("author", author);
formData.append("title", title);
formData.append("content", content);
formData.append("font", font);
formData.append("fontSize", fontSize);
formData.append("alignment", alignment);
formData.append("category",category)

// Append the image only if a file is selected
if (image) {
  formData.append("img", image); // 'img' is the field name the backend expects
}

    const newPost={author,title,content,font,fontSize,alignment,category};
    console.log(newPost)
  const handlePost=async()=>{
    
    try {
      console.log(newPost)
      const res= await fetch(`/api/posts/editPost/${postId}`,{
        method:'POST',

        body:formData
  
  
      })
      const data = await res.json()
      console.log("data recievd:",data)
      if(data){
        setPost({
            title:data.title,
            content:data.content
          })

      }
     
    
  } catch (error) {
    console.log(error)
  }}


  const handleImageChange = (e) => {
    const file = e.target.files[0]; 
    setImage(file); 
  };

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-item">
          <label>Font:</label>
          <select value={font} onChange={(e)=> setFont(e.target.value)}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        <div className="toolbar-item">
          <label>Size:</label>
          <select value={fontSize} onChange={(e)=>setFontSize(e.target.value)}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>
        <div className="toolbar-item">
          <label>Alignment:</label>
          <select value={alignment} onChange={(e)=>setAlignment(e.target.value)}>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      <div className="editor-title">
        <input
          type="text"
          placeholder="Enter title here..."
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
      </div>

      <div className="editor-content">
        <textarea
          style={{
            fontFamily: font,
            fontSize: fontSize,
            textAlign: alignment,
          }}
          placeholder="Start writing here..."
          value={content}
          onChange={(e)=>setContent(e.target.value)}
        />
      </div>
      <div className="editor-title">
        <input
          type="text"
          placeholder="Enter title here..."
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
        />
      </div>
      <div className="editor-title">
        <input
         type="file"
          placeholder="Enter title here..."
          accept="image/*" onChange={handleImageChange}
        />
      </div>
      <Button colorScheme="purple" onClick={handlePost}>Post</Button>
    </div>
  )
}

export default EditPostPage