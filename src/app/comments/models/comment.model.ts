import { User } from "./user.model";

export interface Comment {
  id: number;
  content: string;
  createdAtTimestamp: number;
  score: number;
  user: User;
  replies: Comment[];
  replyingTo?: string;
}
