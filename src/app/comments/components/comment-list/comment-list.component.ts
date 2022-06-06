import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { slideIn, slideOut } from '@ml/shared/animations';
import { Comment, Edit, ReplyDto } from '../../models';
import { User } from '../../models/user.model';

@Component({
  selector: 'ml-comment-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0.1, transform: 'translateY(-100%)' }),
            stagger(200, [animate('0.5s')]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    slideOut({ delayLeave: 1200 }),
    slideIn({ delayEnter: 100 }),
  ],
})
export class CommentListComponent {
  @Input() comments!: Comment[];
  @Input() myUser!: User;
  @Output() delete = new EventEmitter<number>();
  @Output() reply = new EventEmitter<ReplyDto>();
  @Output() up = new EventEmitter<number>();
  @Output() down = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Edit>();

  identifyComment(index: number, comment: Comment) {
    return comment.id;
  }
}
