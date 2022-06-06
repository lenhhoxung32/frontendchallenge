import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Comment } from '@ml/comments/models';
import { persist } from '../../validators';

@Component({
  selector: 'ml-edit-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-comment.component.html',
  styleUrls: ['./edit-comment.component.scss']
})
export class EditCommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() edit = new EventEmitter<string>();

  formControl!: FormControl;

  ngOnInit(): void {
    this.formControl = new FormControl(this.content, [
      persist(this.replyingTo),
    ]);
  }

  get content() {
    return this.replyingTo + this.comment.content;
  }

  get replyingTo(): string {
    return this.comment.replyingTo ? `@${this.comment.replyingTo} ` : '';
  }

  private formatCommentToUpdate(content: string) {
    if (!this.comment.replyingTo) return content;
    return content.substring(content.indexOf(' ')).trim();
  }

  onUpdate() {
    const content = this.formControl.value;
    if (content == '') return alert('Comment cannot be empty');

    this.edit.emit(this.formatCommentToUpdate(content));
  }
}
