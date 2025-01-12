import axios from "axios";

export class StorageFacade {
  private readonly storageUrl: string;

  constructor() {
    this.storageUrl = process.env.S3_ADDRESS ?? "https://cdn.smokymoon.ru";
  }

  public async getItem(url: string) {
    try {
      const request = await axios.get(`${this.storageUrl}/${url}`);
      return request.data;
    } catch (error) {
      console.error("[StorageFacade][getItem]", error);
    }
  }

  public async uploadItem(file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const request = await axios.post(this.storageUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("request", request);

      return request.data;
    } catch (error) {
      console.error("[StorageFacade][uploadItem]", error);
    }
  }
}
