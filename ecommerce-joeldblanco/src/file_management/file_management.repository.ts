import { Injectable } from '@nestjs/common';
import { v2, UploadApiResponse } from 'cloudinary';
import * as toStream from 'buffer-to-stream';

@Injectable()
export class FileManagementRepository {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res as UploadApiResponse);
          }
        },
      );

      toStream(file.buffer).pipe(upload);
    });
  }
}
