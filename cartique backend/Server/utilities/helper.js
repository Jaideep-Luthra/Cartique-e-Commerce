
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djjtzwicm', // Replace with your Cloudinary Cloud Name
    api_key: '547957193758427',       // Replace with your Cloudinary API Key
    api_secret: 'SJzbsMkKAwD9HbfabAluCqSuWKc'  // Replace with your Cloudinary API Secret
  });

const uploadImg = (fileBuffer, publicId) => {    
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { publicId },
            (error, uploadResult) => {
                if (error) {
                    return reject({ error: "Upload failed", details: error });
                }
                else{
                    resolve(uploadResult.secure_url);
                }
            }
        );
        uploadStream.end(fileBuffer);
    });
};


module.exports = {
    uploadImg
};
