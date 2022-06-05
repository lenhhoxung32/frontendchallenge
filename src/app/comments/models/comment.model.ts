import { User } from 'src/app/auth/models';

export interface Comment {
  id: number;
  content: string;
  createdAtTimestamp: number;
  score: number;
  user: User;
  replies: Comment[];
  replyingTo?: string;
}
