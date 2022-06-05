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
import { persist } from '../validators';

@Component({
  selector: 'ml-edit-comment',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4">
      <textarea
        class="overflow-visible"
        [focus]="true"
        [formControl]="formControl"
        cols="30"
        rows="6"
      ></textarea>
      <div class="flex items-center justify-between md:justify-end">
        <!-- use to inject score component -->
        <ng-content></ng-content>
        <!-- end use to inject score component -->

        <!-- update button -->
        <button
          [disabled]="formControl.invalid"
          (click)="onUpdate()"
          type="button"
          class="btn btn-primary"
        >
          Update
        </button>
        <!-- end update button -->
      </div>
    </div>
  `,
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
