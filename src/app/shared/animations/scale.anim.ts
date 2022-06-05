import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CustomAnimation, DefaultCustomAnimation } from '@ml/shared/models';

export function scaleInOut(option?: CustomAnimation) {
  option = { ...DefaultCustomAnimation, ...option };
  const { name, delayEnter, delayLeave, duration, timing } = option;
  return trigger(name || 'scaleInOut', [
    state('void', style({ transform: 'scale(0)' })),
    transition(':enter', [animate('{{duration}}ms {{delay}}ms {{timing}}')], {
      params: { delay: delayEnter, timing, duration },
    }),
    transition(':leave', [animate('{{duration}}ms {{delay}}ms {{timing}}')], {
      params: { delay: delayLeave, timing, duration },
    }),
  ]);
}
