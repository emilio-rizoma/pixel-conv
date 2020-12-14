import { Storage } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';

export interface BucketFile {
    name: string;
    path: string;
}

@Injectable()
export class StorageService {
    storage = new Storage({
        keyFilename: process.env.FIREBASE_KEY_FILE
    }).bucket(process.env.STORAGE_BUCKET);

    async uploadFile(file: BucketFile) {
        await this.storage.upload(file.path, {
            gzip: true,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            }
        });


        return `${file.name} uploaded successfully!;
    }
}
