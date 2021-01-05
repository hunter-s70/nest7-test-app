import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ArticlesService } from './articles.service';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ArticlesGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private articlesService: ArticlesService,
    ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const articleId = request.params.id || '';
    const authorization = request.headers.authorization || '';
    const [, token] = authorization.split(' ');

    if (articleId && token) {
      const {id: authorId} = this.authService.getParsedTokenData(token);
      return this.articlesService.isUserArticleAuthor(articleId, authorId);
    }
    if (token) {
      return this.authService.isUserAuthor(token);
    }
    return false;
  }
}
