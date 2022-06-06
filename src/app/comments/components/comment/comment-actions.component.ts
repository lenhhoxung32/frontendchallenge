import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'ml-comment-actions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex gap-4">
      <!-- delete, edit button -->
      <ng-container *ngIf="isYou; else replyButton">
        <!-- delete -->
        <ml-button (click)="delete.emit()" name="delete"></ml-button>
        <!-- end delete -->

        <!-- edit -->
        <ml-button (click)="edit.emit()" name="edit"></ml-button>
        <!-- end edit -->
      </ng-container>
      <!-- end delete, edit button -->

      <!-- reply button -->
      <ng-template #replyButton>
        <ml-button (click)="reply.emit()" name="reply"></ml-button>
      </ng-template>
      <!-- end reply button -->
    </div>
  `,
})
export class CommentActionsComponent {
  @Input() isYou!: boolean;

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() reply = new EventEmitter<void>();
}