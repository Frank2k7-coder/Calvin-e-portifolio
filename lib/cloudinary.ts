export const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  
  // Your verified credentials
  formData.append('file', file);
  formData.append('upload_preset', 'Nehemie'); 
  formData.append('cloud_name', 'dmmldzjty');

  try {
    // 1. Determine if it's 'video' or 'image'
    const resourceType = file.type.startsWith('video') ? 'video' : 'image';

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dmmldzjty/${resourceType}/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const data = await response.json();
    
    if (data.secure_url) {
      // For videos, Cloudinary returns the same secure_url 
      return data.secure_url; 
    }
    
    throw new Error(data.error?.message || 'Upload failed');
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return null;
  }
};