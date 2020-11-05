require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PhotoModule } from './photos/photo.module';

@Module({
  imports: [PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
