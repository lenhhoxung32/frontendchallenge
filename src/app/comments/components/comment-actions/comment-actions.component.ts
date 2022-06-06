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
  templateUrl: './comment-actions.component.html',
  styleUrls: ['./comment-actions.component.scss'],
})
export class CommentActionsComponent {
  @Input() isYou!: boolean;

  @Output() delete = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() reply = new EventEmitter<void>();
}
