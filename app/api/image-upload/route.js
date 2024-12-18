import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_AP,   
  api_secret: process.env.CLOUDINARY_SECRET, 
});

export async function POST(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { file } = req.body; 

    const response = await cloudinary.uploader.upload(file, {
      folder: "soldiers", 
    });

    return res.status(200).json({ url: response.secure_url });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}
