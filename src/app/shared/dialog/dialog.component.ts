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
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  @Input() dialog!: Dialog;
  @Output() confirmed = new EventEmitter<boolean>();
}
