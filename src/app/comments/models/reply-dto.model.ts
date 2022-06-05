import { User } from '@ml/auth/models';

// Replay Data Transfer Object
export interface ReplyDto {
  myUser: User;
  toUserName: string;
  toCommentId: number;
  content: string;
}
