import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('version')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  version(): string {
    return this.appService.readVersion();
  }
}
