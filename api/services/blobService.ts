import { autoInjectable } from "tsyringe";
import EventEmitter from "events";
import { log } from "../server";
const fs = require("fs");
const path = require("path");
const https = require("https");
const FileType = require("file-type");

@autoInjectable()
export class BlobService extends EventEmitter {
  emitDownload = (
    namespace: string,
    folder: string,
    fileName?: string,
    url?: string
  ) => {
    if (!fileName || !url) return;
    this.emit("download", namespace, folder, fileName, url);
  };

  emitUpdate = (fileName: string, mime: string) =>
    this.emit("update", fileName, mime);

  download = (
    namespace: string,
    folder: string,
    fileName: string,
    url: string
  ) => {
    https.get(url, (res: any) => {
      let data: Uint8Array[] = [];
      res.on("data", (chunk: any) => {
        data.push(chunk);
      });

      res.on("end", async () => {
        let buffer = Buffer.concat(data);
        const { mime } = await FileType.fromBuffer(buffer);
        if (!mime.includes("image")) return;
        const filePath = path.join(__dirname, `${folder}/${fileName}`);
        if (!this.isPathExist(filePath)) return;
        fs.writeFile(filePath, buffer, (err: any) => {
          if (err) {
            log.error(`${err.message} | ${namespace}`);
            return;
          }
          this.emitUpdate(fileName, mime);
        });
      });

      res.on("error", (err: any) => {
        log.error(`${err.message} | ${namespace}`);
      });
    });
  };

  unlink = async (namespace: string, folder: string, fileName: string) => {
    const filePath = path.join(__dirname, `${folder}/${fileName}`);
    if (!fs.existsSync(filePath)) return;
    try {
      await fs.promises.unlink(filePath);
    } catch (err: any) {
      log.error(`${err.message} | ${namespace}`);
    }
  };

  private isPathExist = (filePath: string): boolean => {
    const dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) return true;
    try {
      fs.mkdirSync(dirname, { recursive: true });
      return true;
    } catch {
      return false;
    }
  };
}
