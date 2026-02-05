import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsService {
    private commentsRepository;
    constructor(commentsRepository: Repository<Comment>);
    findByPost(postId: number): Promise<Comment[]>;
    create(postId: number, dto: CreateCommentDto, authorId: number): Promise<Comment>;
    update(id: number, dto: UpdateCommentDto, userId: number): Promise<Comment>;
    remove(id: number, userId: number): Promise<void>;
}
