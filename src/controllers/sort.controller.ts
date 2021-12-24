import {
  Body,
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
  @Post('process')
  async processFile(@Req() req) {
    const { kernel, rounds, floyd } = req.query;
    // const name = image.replace('.jpeg', '');
    // const path = `./public/img/${image}`;
    const { data } = req; 
    console.log(data);

    // const conf = await convolute("some name", path, kernel, rounds, floyd);
    // const baseurl = req.headers.host;
    // const response = {
    //   originalfile: image,
    //   manipulatedfile: conf,
    //   url: `http://${baseurl}/sort/download/${conf}`,
    // };
    return { success: true };
  }

  // @Get('process/:imgpath')
  // async processFile(@Param('imgpath') image, @Req() req) {
  //   const { kernel, rounds, floyd } = req.query;
  //   const name = image.replace('.jpeg', '');
  //   const path = `./public/img/${image}`;
  //   const conf = await convolute(name, path, kernel, rounds, floyd);
  //   const baseurl = req.headers.host;
  //   const response = {
  //     originalfile: image,
  //     manipulatedfile: conf,
  //     url: `http://${baseurl}/sort/download/${conf}`,
  //   };
  //   return response;
  // }
}
