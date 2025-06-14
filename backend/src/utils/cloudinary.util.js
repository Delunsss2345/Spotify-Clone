const cloudinary = require('@config/cloudinary');

class CloudinaryUtil {
  static async uploadCloudinary(file) {
    console.log('Cloudinary config:', cloudinary.config());

    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: 'auto'
      });
      
      return result.secure_url
  
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = CloudinaryUtil;