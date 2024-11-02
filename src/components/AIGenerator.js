// AIGenerator.js
import React, { useState } from "react";
import axios from "axios";
import ImageGeneratorForm from "./ImageGeneratorForm";
import './ImageGeneratorForm.css';

const AIGenerator = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateImage = async (prompt) => {
    setIsLoading(true);
    setError("");
    setImageUrl(""); // Reset previous image

    try {
      const payload = {
        prompt,
        output_format: "webp"
      };

      const response = await axios.post(
        "https://api.stability.ai/v2beta/stable-image/generate/core",
        payload,
        {
          headers: {
            Authorization: `Bearer sk-H4sOIlgOKcxlsUnOvyMW8H6XcsM89gpcdN2I9i8Vi3rSIF7r`, // Direct API key added
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
      <h1 className="title">Misimagine</h1>
      <ImageGeneratorForm onGenerateImage={handleGenerateImage} isLoading={isLoading} />
      {error && <p className="error">{error}</p>}
      {imageUrl && <img src={imageUrl} alt="Generated" className="generated-image" />}
    </div>
  );
};

export default AIGenerator;
