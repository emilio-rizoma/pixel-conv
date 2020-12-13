import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Pixel-CNN <br> <a href="https://rizoma.dev/" target="_blank">Follow us!</a>';
  }
}
