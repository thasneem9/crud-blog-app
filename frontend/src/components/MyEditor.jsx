// src/EditorComponent.js
import React, { useState } from "react";
import "../myeditor.css";
import { Button } from "@chakra-ui/react";
import userAtom from "./atoms/userAtom.js";
import { useRecoilValue } from "recoil";
import { useRecoilState } from "recoil";
import { postAtom } from "./atoms/postAtom.js";
const MyEditor = () => {
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [alignment, setAlignment] = useState("left");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [post,setPost]=useRecoilState(postAtom)
  const [image, setImage] = useState(null);
  const [category,setCategory]=useState('')
  const user = useRecoilValue(userAtom);

  console.log("++++",user)
  console.log("++++dataname",user.username)
  const author=user.username

  const formData = new FormData();
    formData.append("author", author);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("font", font);
    formData.append("fontSize", fontSize);
    formData.append("alignment", alignment);
    formData.append("category",category);

    // Append the image only if a file is selected
    if (image) {
      formData.append("img", image); // 'img' is the field name the backend expects
    }

 
const postInfo={author,title,content,image,font,fontSize,alignment};
const handlePost=async()=>{
  
  try {
    console.log(postInfo)
    const res= await fetch('/api/posts/createPost',{
      method:'POST',
      body:formData


    })
    const data = await res.json()
    console.log("data recievd:",data)
    setPost({
      title:title,
      author:author,
      content:content
    })
  
} catch (error) {
  
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
          placeholder="Enter category here..."
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
  );
};

export default MyEditor;
