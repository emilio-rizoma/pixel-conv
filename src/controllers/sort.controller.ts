import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/services/file-uploading.service';
import { convolute } from 'src/services/convolute.service';

export interface IRequestFile {
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
  async uploadedFile(@UploadedFile() file, @Req() req) {
    const reqFile = file as IRequestFile;
    const baseurl = req.headers.host;
    const response = {
      originalname: reqFile.originalname,
      filename: reqFile.filename,
      url: `${baseurl}/sort/process/${reqFile.filename}`,
    };
    return response;
  }

  @Get('process/:imgpath')
  async processFile(@Param('imgpath') image, @Req() req) {
    const { kernel, rounds, floyd } = req.query;
    const name = image.replace('.jpeg', '');
    const path = `./public/img/${image}`;
    const conf = await convolute.run(name, path, kernel, rounds, floyd);
    const baseurl = req.headers.host;
    const response = {
      originalfile: image,
      manipulatedfile: conf,
      url: `http://${baseurl}/sort/download/${conf}`,
    };
    return response;
  }

  @Get('download/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './public/output' });
  }
}
