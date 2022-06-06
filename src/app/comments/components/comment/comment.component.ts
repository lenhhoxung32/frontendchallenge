import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Comment, Edit, ReplyDto } from '@ml/comments/models';
import { User } from '@ml/comments/models/user.model';

@Component({
  selector: 'ml-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent {
  @Input() comment!: Comment;
  @Input() myUser!: User;
  @Output() reply = new EventEmitter<ReplyDto>();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Edit>();
  @Output() up = new EventEmitter<number>();
  @Output() down = new EventEmitter<number>();

  replyingTo?: string;
  openEditPanel = false;

  get user(): User {
    return this.comment.user;
  }

  get avatar(): string {
    return this.comment.user.image.png;
  }

  /**
   * - When User click to edit to a comment,
   */
  onEdit(): void {
    this.openEditPanel = true;
  }

  /**
   * - When User click to reply to a comment,
   */
  onReply() {
    if (
      this.replyingTo &&
      confirm(
        `Are you sure you want to cancel your reply to ${this.comment.user.username} ?`
      )
    ) {
      this.replyingTo = undefined;
      return;
    }

    this.replyingTo = `@${this.comment.user.username} `;
  }

  get isYou(): boolean {
    if (!this.myUser) return false;
    return this.comment.user.username === this.myUser.username;
  }

  sendReply(content: string) {
    this.replyingTo = undefined;
    this.reply.emit({
      myUser: this.myUser,
      content: content.substring(content.indexOf(' ')).trim(),
      toUserName: this.user.username,
      toCommentId: this.comment.id,
    });
  }

  get content(): string {
    const tmp = this.comment.replyingTo;
    return `${tmp ? '@' + tmp + ' ' : ''}${this.comment.content}`;
  }

  onUpdate(newContent: string): void {
    // Close edit panel
    this.openEditPanel = false;

    if (newContent === this.comment.content) return;

    this.edit.emit({ id: this.comment.id, content: newContent });
  }

  identifyComment(index: number, comment: Comment) {
    return comment.id;
  }
}
