import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { scaleInOut } from '@ml/shared/animations';
import { fadeInOut } from '@ml/shared/animations/fade.anim';
import { Dialog } from '@ml/shared/dialog';

@Component({
  selector: 'ml-delete-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ml-dialog-ng-content class="fixed" [open]="open">
      <ml-dialog
        (confirmed)="deleted.emit($event)"
        [dialog]="dialog"
      ></ml-dialog>
    </ml-dialog-ng-content>
  `,
  animations: [
    fadeInOut({ delayEnter: 0, delayLeave: 300 }),
    scaleInOut({ delayEnter: 300, delayLeave: 0 }),
  ],
})
export class DeletePopupComponent {
  @Input() open = false;
  /**
   * - Emit true when the user confirm the deletion
   * - Emit false when the user cancel the deletion
   */
  @Output() deleted = new EventEmitter<boolean>();

  dialog: Dialog = {
    title: 'Delete comment',
    message:
      "Are you sure you want to delete this comment? This will remove the comment and can't be undone.",
    confirmedButtonText: 'delete',
  };
}
