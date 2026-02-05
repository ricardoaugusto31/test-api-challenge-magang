import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    posts: Post[];
    comments: Comment[];
}
