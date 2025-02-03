import axios from "axios";

export class ImageUploader {
  private readonly _image?: File;
  private readonly _storageAddress =
    process.env.STORAGE_ADDRESS || "https://cdn.smokymoon.ru";

  public async upload() {
    if (!this._image) throw new Error("No image provided");

    const formData = new FormData();
    formData.append("file", this._image);

    const { data } = await axios.post(
      `${this._storageAddress}/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return `${this._storageAddress}/file/${data.imageUrl}`;
  }

  public async delete(image: string) {
    await axios.delete(image);
  }

  constructor(image?: File) {
    this._image = image;
  }
}
