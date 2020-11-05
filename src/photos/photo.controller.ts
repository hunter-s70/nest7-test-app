import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';

@Controller('photos')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  async getPhotos(): Promise<any> {
    // const user = await this.photoService.createPhoto();
    return this.photoService.findAll().then((data) => {
      return data;
    }).catch((err) => {
      return err;
    });
  }
}
