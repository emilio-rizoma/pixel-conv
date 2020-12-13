import { Controller, Get, HttpService, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/file-uploading.utils';
import { convolute } from 'src/utils/sorter.utils';

export interface RequestFile {
    /** Field name specified in the form */
    fieldname: string;
    /** Name of the file on the user's computer */
    originalname: string;
    /** Encoding type of the file */
    encoding: string;
    /** Mime type of the file */
    mimetype: string;
    /** Size of the file in bytes */
    size: number;
    /** The folder to which the file has been saved (DiskStorage) */
    destination: string;
    /** The name of the file within the destination (DiskStorage) */
    filename: string;
    /** Location of the uploaded file (DiskStorage) */
    path: string;
    /** A Buffer of the entire file (MemoryStorage) */
    buffer: Buffer;
}

@Controller('sort')
export class SortController {
    constructor() { }

    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './public/img',
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadedFile(@UploadedFile() file) {
        const reqFile = file as RequestFile;
        const response = {
            originalname: reqFile.originalname,
            filename: reqFile.filename
        };
        return response;
    }

    @Get('process/:imgpath')
    async processFile(@Param('imgpath') image, @Req() req) {
        const { kernel, rounds, floyd } = req.query;
        const name = image.replace('.jpeg', '');
        const path = `./public/img/${image}`;
        const conf = await convolute.run(name, path, kernel, rounds, floyd);
        const response = {
            originalfile: image,
            manipulatedfile: conf
        };
        return response;
    }


    @Get('download/:imgpath')
    seeUploadedFile(@Param('imgpath') image, @Res() res) {
        return res.sendFile(image, { root: './public/output' });
    }



}
