import { Body, Controller, Post } from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleDto } from './article.dto';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService
  ) {}

  @Post('create')
  async createArticle(@Body() articleDto: ArticleDto): Promise<Article> {
    return this.articlesService.createArticle(articleDto);
  }
}
