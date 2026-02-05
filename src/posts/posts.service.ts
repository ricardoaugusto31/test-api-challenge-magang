import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author'],
    });
    if (!post) {
      throw new NotFoundException('Post tidak ditemukan');
    }
    return post;
  }

  async create(dto: CreatePostDto, authorId: number): Promise<Post> {
    const post = this.postsRepository.create({ ...dto, authorId });
    return this.postsRepository.save(post);
  }

  async update(id: number, dto: UpdatePostDto, userId: number): Promise<Post> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Anda tidak bisa mengubah post orang lain');
    }
    Object.assign(post, dto);
    return this.postsRepository.save(post);
  }
  
  async remove(id: number, userId: number): Promise<void> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('Anda tidak bisa menghapus post orang lain');
    }
    await this.postsRepository.remove(post);
  }
}