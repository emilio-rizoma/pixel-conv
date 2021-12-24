import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  readVersion(): string {
    const { PROJECT_NAME, VERSION } = process.env;
    return `${PROJECT_NAME} Version: ${VERSION} <br> <a href="https://emilioparra.dev/" target="_blank">Follow me!</a>`;
  }
}
