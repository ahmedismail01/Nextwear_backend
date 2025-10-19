const sharp = require("sharp");
const cloudinaryConnector = require("../connectors/cloudinary/cloudinaryConnector");

class FileUploadService {
  async uploadImage(imageFile) {
    const optimizedBuffer = await sharp(imageFile.buffer)
      .resize({ width: 1000 })
      .webp({ quality: 80 })
      .toBuffer();

    let result = await cloudinaryConnector.uploadImage(
      `data:image/webp;base64,${optimizedBuffer.toString("base64")}`
    );

    return result.secure_url;
  }
  async uploadImages(files) {
    if (!files?.length) return [];
    const urls = await Promise.all(files?.map((file) => this.uploadImage(file)));
    return urls;
  }
}

module.exports = new FileUploadService();
