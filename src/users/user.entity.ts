import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

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
}
