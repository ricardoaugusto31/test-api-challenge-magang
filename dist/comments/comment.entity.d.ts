import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    authorId: number;
    post: Post;
    postId: number;
}
