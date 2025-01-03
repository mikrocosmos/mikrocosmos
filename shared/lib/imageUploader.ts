import { promises as fs } from "fs";

export class ImageUploader {
  private image: File;

  private generateId() {
    const id = Array(18)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join("");

    const extension = this.image.name.split(".").pop();

    return `${id}.${extension}`;
  }

  public async upload() {
    const imageData = await this.image.arrayBuffer();
    const filePath = `${process.cwd()}/public/uploads/${this.generateId()}`;
    console.log(`Writing image to: ${filePath}`);
    await fs.writeFile(filePath, Buffer.from(imageData));

    const imageUrl = filePath.split("public")[1];
    console.log(`Image URL: ${imageUrl}`);
    return imageUrl;
  }

  constructor(image: File) {
    this.image = image;
  }
}
