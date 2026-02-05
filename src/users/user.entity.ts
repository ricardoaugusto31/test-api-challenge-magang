import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
  
  @CreateDateColumn()
  createdAt: Date;
  
  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];
  
  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}