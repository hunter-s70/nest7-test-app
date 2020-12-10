import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 16 })
  username: string;

  @Column({ length: 40 })
  email: string;

  @Column({ length: 70 })
  password: string;

  @Column({ nullable: true })
  token: string;
}
