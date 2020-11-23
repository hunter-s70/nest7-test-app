import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe
} from '@nestjs/common';
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

  @Get('all')
  async getArticlesList(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }

  @Get(':id')
  async getArticle(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    return this.articlesService.findById(id);
  }

  @Put(':id')
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() articleDto: ArticleDto
  ): Promise<Article> {
    const article = await this.articlesService.findById(id);
    return this.articlesService.updateArticle(article, articleDto);
  }

  @Delete(':id')
  async deleteArticle(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    const article = await this.articlesService.findById(id);
    return this.articlesService.deleteArticle(article);
  }
}
