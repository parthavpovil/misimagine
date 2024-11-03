// AIGenerator.js
import React, { useState } from "react";
import axios from "axios";
import ImageGeneratorForm from "./ImageGeneratorForm";
import './ImageGeneratorForm.css';


const AIGenerator = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to add humor to the prompt
  const makeFunnyPrompt = (prompt) => {
    return `create a random image`;
  };

  const handleGenerateImage = async (prompt) => {
    setIsLoading(true);
    setError("");
    setImageUrl(""); // Reset previous image

    // Modify prompt with humor
    const funnyPrompt = makeFunnyPrompt(prompt);

    try {
      const payload = {
        prompt: funnyPrompt,
        output_format: "webp"
      };

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        payload,
        {
          headers: {
            Authorization: `Bearer sk-q1SRI60Yk8zO4KTJVHBdiBbPOcM93w8Yf5Qv76Uo6lR6ELRl`, // API key
            Accept: "image/*",
            "Content-Type": "multipart/form-data"
          },
          responseType: "arraybuffer"
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], { type: "image/webp" });
        const imageURL = URL.createObjectURL(blob);
        setImageUrl(imageURL);
      } else {
        setError("Image generation failed. Please try a different prompt.");
      }
    } catch (err) {
      setError("An error occurred while generating the image.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      {/* Animated background */}
      <div className="animated-background"></div>

      {/* Main Content */}
      <h1 className="title">Misimagine</h1>
      <ImageGeneratorForm onGenerateImage={handleGenerateImage} isLoading={isLoading} />
      {error && <p className="error">{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
    </div>
  );
};

export default AIGenerator;
