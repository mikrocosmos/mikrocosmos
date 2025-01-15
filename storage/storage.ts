import axios from "axios";
import { exec } from "node:child_process";
import * as util from "node:util";
const execProm = util.promisify(exec);

export class Storage {
  private readonly storageUrl: string;

  constructor() {
    this.storageUrl = process.env.S3_ADDRESS ?? "https://cdn.smokymoon.ru";
  }

  private getExtension(url: string) {
    return url.split(".").pop();
  }

  private generateId(imageUrl: string) {
    const id = Array(18)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join("");

    const extension = this.getExtension(imageUrl);
    return `/${id}.${extension}`;
  }

  private async getAuthorizationString(signatureString: string) {
    return await execProm(
      `echo -en ${signatureString} | openssl sha1 -hmac ${process.env.S3_SECRET_KEY} -binary | base64`,
    );
  }

  public async getItem(url: string) {
    try {
      const request = await axios.get(`${this.storageUrl}/${url}`);
      return request.data;
    } catch (error) {
      console.error("[Storage][getItem]", error);
    }
  }

  public async uploadItem(image: File) {
    try {
      const imageData = await image.arrayBuffer();
      const imageUrl = this.generateId(image.name);
      const extension = this.getExtension(image.name);

      const contentType = `image/${extension}`;
      const dateValue = new Date().toUTCString();
      const signatureString = `PUT\\n\\n${contentType}\\n${dateValue}\\n${imageUrl}`;

      const signatureHash = await this.getAuthorizationString(signatureString);
      console.log(`signatureHash:`, signatureHash.stdout);

      const Authorization = `AWS ${process.env.S3_ACCESS_KEY}:${signatureHash.stdout}`;

      console.log("Authorization:", Authorization);
      const headers = {
        "Content-Type": contentType,
        Authorization,
        Date: dateValue,
      };

      const request = await axios.put(
        `${this.storageUrl}${imageUrl}`,
        imageData,
        { headers },
      );

      console.log("request", request);

      return `${this.storageUrl}/${imageUrl}`;
    } catch (error) {
      console.error("[Storage][uploadItem]", error);
    }
  }
}
