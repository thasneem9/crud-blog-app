// src/EditorComponent.js
import React, { useState } from "react";
import './editor.css'
import { Button } from "@chakra-ui/react";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { postAtom } from "../atoms/postAtom.js";
import { useParams } from "react-router-dom";

const EditPostPage = () => {
    const user = useRecoilValue(userAtom);
    const post = useRecoilValue(postAtom);
    const {postId}=useParams();
    console.log(postId)
    //that for intital values
    console.log("++++",user)
    console.log("++++dataname",user.username)
    const author=user.username
    const [font, setFont] = useState("Arial");
    const [fontSize, setFontSize] = useState("16px");
    const [alignment, setAlignment] = useState("left");
  
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
  //we have to go to /editpost/postid..it works
  //send to backend
  

    
  

  
   
  const newPost={author,title,content,font,fontSize,alignment};
  console.log(newPost)
  const handlePost=async()=>{
    
    try {
      console.log(postInfo)
      const res= await fetch(`/api/posts/editPost/${postId}`,{
        method:'POST',
        headers:{"Content-Type":'application/json'},
        body:JSON.stringify(newPost)
  
  
      })
      const data = await res.json()
      console.log("data recievd:",data)
    
  } catch (error) {
    
  }}



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
      <Button colorScheme="purple" onClick={handlePost}>Post</Button>
    </div>
  )
}

export default EditPostPage