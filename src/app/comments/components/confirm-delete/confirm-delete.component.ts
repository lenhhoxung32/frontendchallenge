import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'ml-confirm-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {
  /**
   * - Emit true when the user confirm the deletion
   * - Emit false when the user cancel the deletion
   */
  @Output() deleted = new EventEmitter<boolean>();
}
