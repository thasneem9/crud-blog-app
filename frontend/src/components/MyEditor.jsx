// src/EditorComponent.js
import React, { useState } from "react";
import "../myeditor.css";

const MyEditor = () => {
  const [font, setFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16px");
  const [alignment, setAlignment] = useState("left");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleFontChange = (e) => setFont(e.target.value);
  const handleFontSizeChange = (e) => setFontSize(e.target.value);
  const handleAlignmentChange = (e) => setAlignment(e.target.value);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  return (
    <div className="editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-item">
          <label>Font:</label>
          <select value={font} onChange={handleFontChange}>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
          </select>
        </div>
        <div className="toolbar-item">
          <label>Size:</label>
          <select value={fontSize} onChange={handleFontSizeChange}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
        </div>
        <div className="toolbar-item">
          <label>Alignment:</label>
          <select value={alignment} onChange={handleAlignmentChange}>
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
          onChange={handleTitleChange}
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
          onChange={handleContentChange}
        />
      </div>
    </div>
  );
};

export default MyEditor;
