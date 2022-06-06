import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { scaleInOut } from '@ml/shared/animations';
import { fadeInOut } from '@ml/shared/animations/fade.anim';

@Component({
  selector: 'ml-dialog-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
  animations: [
    fadeInOut({ delayEnter: 0, delayLeave: 300 }),
    scaleInOut({ delayEnter: 300, delayLeave: 0 }),
  ],
})
export class DialogContentComponent {
  @Input() open = false;
}
