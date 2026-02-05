import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    authorId: number;
    comments: Comment[];
}
