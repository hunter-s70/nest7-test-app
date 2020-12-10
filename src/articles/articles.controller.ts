import {
  Body,
  Param,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  ParseIntPipe,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Article } from './article.entity';
import { ArticleDto } from './article.dto';
import { ArticlesService } from './articles.service';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(
    private articlesService: ArticlesService
  ) {}

  @Post('create')
  @ApiResponse({ status: 201, description: 'New article created.', type: Article})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  async createArticle(@Body() articleDto: ArticleDto): Promise<Article> {
    return this.articlesService.createArticle(articleDto);
  }

  @Get('all')
  @ApiResponse({ status: 200, description: 'Articles list.', type: [Article]})
  async getArticlesList(): Promise<Article[]> {
    return this.articlesService.getAllArticles();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Specific article', type: Article})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async getArticle(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    const article = await this.articlesService.findById(id);
    if (!article) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errors: 'can\'t find article',
      }, HttpStatus.NOT_FOUND);
    }
    return article;
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Updated article.', type: Article})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() articleDto: ArticleDto
  ): Promise<Article> {
    const article = await this.articlesService.findById(id);
    if (!article) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errors: 'can\'t find article',
      }, HttpStatus.NOT_FOUND);
    }
    return this.articlesService.updateArticle(article, articleDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Deleted article.', type: Article})
  @ApiResponse({ status: 404, description: 'Not found.'})
  async deleteArticle(@Param('id', ParseIntPipe) id: number): Promise<Article> {
    const article = await this.articlesService.findById(id);
    if (!article) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errors: 'can\'t find article',
      }, HttpStatus.NOT_FOUND);
    }
    return this.articlesService.deleteArticle(article);
  }
}
