import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private postsRepository;
    constructor(postsRepository: Repository<Post>);
    findAll(): Promise<Post[]>;
    findOne(id: number): Promise<Post>;
    create(dto: CreatePostDto, authorId: number): Promise<Post>;
    update(id: number, dto: UpdatePostDto, userId: number): Promise<Post>;
    remove(id: number, userId: number): Promise<void>;
}
