import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async createArticle(articleDto: ArticleDto): Promise<Article> {
    const article = new Article();
    article.title = articleDto.title;
    article.text = articleDto.text;
    return this.articleRepository.save(article);
  }
}
