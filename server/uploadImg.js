const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'duvg31sny',
  api_key: '514754247966153',
  api_secret: '04a9zfovgcTCdPiu_SSuhpc2XiM'
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

const uploadImage = (image) => {
  //imgage = > base64
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        console.log(result.secure_url);
        return resolve(result.secure_url);
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};

module.exports = uploadImage;