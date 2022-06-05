import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { scaleInOut } from '@ml/shared/animations';
import { fadeInOut } from '@ml/shared/animations/fade.anim';

@Component({
  selector: 'ml-dialog-ng-content',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngIf="open"
      @fadeInOut
      class="fixed top-0 left-0l w-full h-screen grid place-content-center bg-black/20"
    >
      <div @scaleInOut class="container">
        <ng-content class="block"></ng-content>
      </div>
    </div>
  `,
  animations: [
    fadeInOut({ delayEnter: 0, delayLeave: 300 }),
    scaleInOut({ delayEnter: 300, delayLeave: 0 }),
  ],
})
export class DialogNgContentComponent {
  @Input() open = false;
}
