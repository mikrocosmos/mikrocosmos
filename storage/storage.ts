import * as Minio from "minio";

const minioClient = new Minio.Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
});

class StorageSingleton {
  private static _instance: StorageSingleton;

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  private async bucketExists(bucketName: string = "smoky-bucket") {
    try {
      return await minioClient.bucketExists(bucketName);
    } catch (error) {
      console.error("[StorageSingleton.checkBucket] Server error", error);
    }
  }

  private async makeBucket(
    bucketName: string = "smoky-bucket",
    region: string = "us-east-1",
  ) {
    try {
      const exists = await minioClient.bucketExists(bucketName);
      const policy = {
        Version: "2012-10-17",
        Statement: [
          {
            Effect: "Allow",
            Principal: {
              AWS: ["*"],
            },
            Action: ["s3:GetBucketLocation", "s3:ListBucket"],
            Resource: [`arn:aws:s3:::${bucketName}`],
          },
          {
            Effect: "Allow",
            Principal: {
              AWS: ["*"],
            },
            Action: ["s3:GetObject"],
            Resource: [`arn:aws:s3:::${bucketName}/*`],
          },
        ],
      };
      if (exists) {
        return console.log(`Бакет ${bucketName} уже существует на ${region}`);
      }
      await minioClient.makeBucket(bucketName, region);
      await minioClient.setBucketPolicy(bucketName, JSON.stringify(policy));
      return console.log(`Бакет ${bucketName} создан на ${region}`);
    } catch (error) {
      console.error("[StorageSingleton.makeBucket] Server error", error);
    }
  }

  public listObjects(bucketName: string = "smoky-bucket") {
    try {
      return minioClient.listObjects(bucketName);
    } catch (error) {
      console.error("[StorageSingleton.listObjects] Server error", error);
    }
  }

  public async getObject(
    objectName: string,
    bucketName: string = "smoky-bucket",
  ) {
    try {
      if (!(await this.bucketExists(bucketName))) {
        await this.makeBucket(bucketName);
        return console.log("Хранилище только что было создано");
      }
      return await minioClient.getObject(bucketName, objectName);
    } catch (error) {
      console.error("[StorageSingleton.getObject] Server error", error);
    }
  }

  public async putObject(
    file: Buffer,
    objectName: string,
    bucketName: string = "smoky-bucket",
  ) {
    try {
      if (!(await this.bucketExists(bucketName))) {
        await this.makeBucket(bucketName);
      }

      await minioClient.putObject(bucketName, objectName, file);
      return `http://localhost:9000/${bucketName}/${objectName}`;
    } catch (error) {
      console.error("[StorageSingleton.putObject] Server error", error);
    }
  }

  public async deleteObject(
    objectName: string,
    bucketName: string = "smoky-bucket",
  ) {
    try {
      if (!(await this.bucketExists(bucketName))) {
        await this.makeBucket(bucketName);
        return console.log("Хранилище только что было создано");
      }
      return await minioClient.removeObject(bucketName, objectName);
    } catch (error) {
      console.error("[StorageSingleton.deleteObject] Server error", error);
    }
  }
}

const s3Storage = StorageSingleton.Instance;

export default s3Storage;
