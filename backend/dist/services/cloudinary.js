"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageToCloudinary = void 0;
const env_1 = require("../config/env");
const ImageToCloudinary = async (image) => {
    const cloudName = env_1.ENV.CLOUDINARY_CLOUD_NAME;
    const uploadPreset = env_1.ENV.UPLOAD_PRESET;
    const formData = { image: image };
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
    return { data, errorMessage };
};
exports.ImageToCloudinary = ImageToCloudinary;
