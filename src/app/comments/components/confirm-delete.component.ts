import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'ml-confirm-delete',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4 bg-white max-w-md p-6 rounded-lg">
      <!-- text -->
      <h3 class="text-lg font-bold">Delete comment</h3>
      <p class="text-muted">
        Are you sure you want to delete this comment? This will remove the
        comment and can't be undone.
      </p>
      <!-- end text -->

      <div class="flex items-center justify-end gap-6">
        <!-- cancel -->
        <button
          (click)="deleted.emit(false)"
          type="button"
          class="btn btn-muted px-4"
        >
          NO, CANCEL
        </button>
        <!-- end cancel -->

        <!-- delete -->
        <button
          (click)="deleted.emit(true)"
          type="button"
          class="btn btn-danger px-4"
        >
          YES, DELETE
        </button>
        <!-- end delete -->
      </div>
    </div>
  `,
})
export class ConfirmDeleteComponent {
  /**
   * - Emit true when the user confirm the deletion
   * - Emit false when the user cancel the deletion
   */
  @Output() deleted = new EventEmitter<boolean>();
}
