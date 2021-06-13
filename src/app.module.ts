import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SortController } from './controllers/sort.controller';

@Module({
  imports: [
    HttpModule,
    MulterModule.register({
      dest: './public/img',
    }),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, SortController],
  providers: [AppService],
})
export class AppModule {}
