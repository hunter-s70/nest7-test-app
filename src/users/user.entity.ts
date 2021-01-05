import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Article } from '../articles/article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 40 })
  email: string;

  @Exclude()
  @Column({ length: 70 })
  password: string;

  @Exclude()
  @Column({ nullable: true })
  token: string;

  @Column({ nullable: true })
  role: string;

  @OneToMany(() => Article, article => article.author)
  articles: Article[];
}
