import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleDto } from './article.dto';
import { Article } from './article.entity';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    private authService: AuthService,
  ) {}

  async saveArticle(article: Article, articleDto: ArticleDto): Promise<Article> {
    article.title = articleDto.title;
    article.text = articleDto.text;
    return this.articleRepository.save(article);
  }

  async setAuthor(article: Article, token: string): Promise<Article> {
    article.author = await this.authService.getAuthor(token);
    return article;
  }

  async createArticle(articleDto: ArticleDto, token: string): Promise<Article> {
    const article = new Article();
    const authoredArticle = await this.setAuthor(article, token);
    return this.saveArticle(authoredArticle, articleDto);
  }

  async updateArticle(article: Article, articleDto: ArticleDto): Promise<Article> {
    return this.saveArticle(article, articleDto);
  }

  async isUserArticleAuthor(articleId: number, authorId: number): Promise<boolean> {
    const article = await this.findById(articleId);
    return article.author && article.author.id && article.author.id === authorId;
  }

  async findById(id: number): Promise<Article> {
    return this.articleRepository.findOne({id}, { relations: ['author'] });
  }

  async deleteArticle(article: Article): Promise<Article> {
    return this.articleRepository.remove(article);
  }

  async getAllArticles(): Promise<Article[]> {
    return this.articleRepository.find({ relations: ['author'] });
  }
}
