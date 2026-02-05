import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  async findByPost(postId: number): Promise<Comment[]> {
    return this.commentsRepository.find({
      where: { postId },
      relations: ['author'],
      order: { createdAt: 'DESC' },
    });
  }

  async create(postId: number, dto: CreateCommentDto, authorId: number): Promise<Comment> {
    const comment = this.commentsRepository.create({ ...dto, postId, authorId });
    return this.commentsRepository.save(comment);
  }

  async update(id: number, dto: UpdateCommentDto, userId: number): Promise<Comment> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment tidak ditemukan');
    }
    if (comment.authorId !== userId) {
      throw new ForbiddenException('Anda tidak bisa mengubah comment orang lain');
    }
    Object.assign(comment, dto);
    return this.commentsRepository.save(comment);
  }
  
  async remove(id: number, userId: number): Promise<void> {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment tidak ditemukan');
    }
    if (comment.authorId !== userId) {
      throw new ForbiddenException('Anda tidak bisa menghapus comment orang lain');
    }
    await this.commentsRepository.remove(comment);
  }
}