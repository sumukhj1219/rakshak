import { useState } from "react";

export default function ImageUpload({ value, onChange }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      try {
        setUploading(true);

        const response = await fetch("/api/image-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ file: reader.result }),
        });

        const data = await response.json();
        if (response.ok) {
          onChange(data.url);
        } else {
          console.error("Upload failed:", data.error);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setUploading(false);
      }
    };
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Upload an Image</h2>
      <input type="file" onChange={handleFileChange} />
      {uploading && <p>Uploading...</p>}
      {value && (
        <div>
          <p>Image uploaded successfully!</p>
          <img
            src={value}
            alt="Uploaded"
            style={{
              width: "300px",
              margin: "20px auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}
