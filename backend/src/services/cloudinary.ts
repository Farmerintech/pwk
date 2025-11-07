import { ENV } from "../config/env";

export const ImageToCloudinary = async (image:any) =>{
    const cloudName   = ENV.CLOUDINARY_CLOUD_NAME;
          const uploadPreset = ENV.UPLOAD_PRESET;
          const formData:any = {image:image}
          const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
        
          const response = await fetch(url, {
            method: "POST",
            body: formData
          });
          let errorMessage;
          if (!response.ok) {
            const text = await response.text();
            errorMessage = (`Image upload failed: ${text}`);
          }
        const data = await response.json();
        return {data, errorMessage};
}