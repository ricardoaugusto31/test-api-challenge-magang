import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    findAll(): Promise<import("./post.entity").Post[]>;
    findOne(id: string): Promise<import("./post.entity").Post>;
    create(dto: CreatePostDto, req: any): Promise<import("./post.entity").Post>;
    update(id: string, dto: UpdatePostDto, req: any): Promise<import("./post.entity").Post>;
    remove(id: string, req: any): Promise<void>;
}
