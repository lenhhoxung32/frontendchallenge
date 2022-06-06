import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Comment } from '@ml/comments/models';

@Component({
  selector: 'ml-comment-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment-content.component.html',
  styleUrls: ['./comment-content.component.scss'],
})
export class CommentContentComponent {
  @Input() comment!: Comment;
}
