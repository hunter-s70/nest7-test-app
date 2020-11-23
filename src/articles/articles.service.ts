import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findById(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({id});
    if (!article) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        errors: 'can\'t find article',
      }, HttpStatus.NOT_FOUND);
    }
    return article;
  }

  async updateArticle(article: Article, articleDto: ArticleDto): Promise<Article> {
    article.title = articleDto.title;
    article.text = articleDto.text;
    return this.articleRepository.save(article);
  }

  async deleteArticle(article: Article): Promise<Article> {
    return this.articleRepository.remove(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }
}
