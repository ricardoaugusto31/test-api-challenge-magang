import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private commentsService;
    constructor(commentsService: CommentsService);
    findByPost(postId: string): Promise<import("./comment.entity").Comment[]>;
    create(postId: string, dto: CreateCommentDto, req: any): Promise<import("./comment.entity").Comment>;
    update(id: string, dto: UpdateCommentDto, req: any): Promise<import("./comment.entity").Comment>;
    remove(id: string, req: any): Promise<void>;
}
