const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs/promises");

const uploadImgTocloud = async (tempUpload, destination, filename) => {
  const resultUpload = path.join(destination, filename);
  await fs.rename(tempUpload, resultUpload);

  cloudinary.config({
    secure: true,
  });

  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };

  try {
    const result = await cloudinary.uploader.upload(resultUpload, options);
    await fs.unlink(resultUpload);
    return result.url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploadImgTocloud;
