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

  async saveArticle(article: Article, articleDto: ArticleDto): Promise<Article> {
    article.title = articleDto.title;
    article.text = articleDto.text;
    return this.articleRepository.save(article);
  }

  async createArticle(articleDto: ArticleDto): Promise<Article> {
    const article = new Article();
    return this.saveArticle(article, articleDto);
  }

  async updateArticle(article: Article, articleDto: ArticleDto): Promise<Article> {
    return this.saveArticle(article, articleDto);
  }

  async findById(id: number): Promise<Article> {
    return this.articleRepository.findOne({id});
  }

  async deleteArticle(article: Article): Promise<Article> {
    return this.articleRepository.remove(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find();
  }
}
