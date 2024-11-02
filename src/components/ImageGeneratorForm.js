// ImageGeneratorForm.js
import React, { useState } from "react";
import "./ImageGeneratorForm.css";


const ImageGeneratorForm = ({ onGenerateImage, isLoading }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerateImage(inputText);
    setInputText("");
  };


  
  
    return (
      <form onSubmit={handleSubmit} className="image-generator-form">
        <div className="form-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Describe the image you want to see..."
            required
            className="input-field"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? (
              <span className="loading-container">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Image"
            )}
          </button>
        </div>
      </form>
    );
  };
  export default ImageGeneratorForm;  