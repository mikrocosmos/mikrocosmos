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
    const imageUrl = `${process.cwd()}/public/uploads/${this.generateId()}`;
    await fs.writeFile(imageUrl, Buffer.from(imageData));

    return imageUrl.split("public")[1];
  }

  constructor(image: File) {
    this.image = image;
  }
}
