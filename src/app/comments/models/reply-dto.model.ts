import { User } from "./user.model";

// Replay Data Transfer Object
export interface ReplyDto {
  myUser: User;
  toUserName: string;
  toCommentId: number;
  content: string;
}
