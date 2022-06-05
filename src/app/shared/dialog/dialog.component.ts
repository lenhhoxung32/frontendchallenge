import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Dialog } from '.';

@Component({
  selector: 'ml-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid gap-4 bg-white max-w-sm p-6 rounded-lg">
      <!-- text -->
      <h3 class="text-lg font-bold">{{ dialog.title }}</h3>
      <p class="text-muted text-sm sm:text-base">{{ dialog.message }}</p>
      <!-- end text -->

      <div class="flex items-center justify-center gap-6">
        <!-- cancel -->
        <button
          (click)="confirmed.emit(false)"
          type="button"
          class="btn btn-muted px-4 text-xs sm:text-base"
        >
          NO, CANCEL
        </button>
        <!-- end cancel -->

        <!-- confirmed button -->
        <button
          (click)="confirmed.emit(true)"
          type="button"
          class="btn btn-danger px-4 uppercase text-xs sm:text-base"
        >
          YES, {{ dialog.confirmedButtonText }}
        </button>
        <!-- confirmed button -->
      </div>
    </div>
  `,
})
export class DialogComponent {
  @Input() dialog!: Dialog;
  @Output() confirmed = new EventEmitter<boolean>();
}
