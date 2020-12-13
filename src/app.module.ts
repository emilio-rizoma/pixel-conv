import { HttpModule, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SortController } from './sort/sort.controller';

@Module({
  imports: [HttpModule, MulterModule.register({
    dest: './public/img',
  })],
  controllers: [AppController, SortController],
  providers: [AppService],
})
export class AppModule { }
