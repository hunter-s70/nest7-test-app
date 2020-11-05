import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService {
  constructor(
    @Inject('PHOTO_REPOSITORY')
    private photoRepository: Repository<Photo>,
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.find();
  }

  async createPhoto(): Promise<Photo> {
    const photo = new Photo();
    photo.name = 'myPhoto';
    photo.description = 'first one';
    photo.filename = 'test-picture.png';
    photo.views = 1;
    photo.isPublished = true;
    return this.photoRepository.save(photo);
  }
}
