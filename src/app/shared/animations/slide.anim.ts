import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CustomAnimation, DefaultCustomAnimation } from '@ml/shared/models';

export function slideIn(option?: CustomAnimation) {
  option = { ...DefaultCustomAnimation, ...option };
  const { name, delayEnter, delayLeave, duration, timing } = option;
  return trigger(name || 'slideIn', [
    state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
    transition(':enter', [animate('{{duration}}ms {{delay}}ms {{timing}}')], {
      params: { delay: delayEnter, timing, duration },
    }),
  ]);
}

export function slideOut(option?: CustomAnimation) {
  option = { ...DefaultCustomAnimation, ...option };
  const { name, delayLeave, duration, timing } = option;
  return trigger(name || 'slideOut', [
    transition(
      ':leave',
      [
        animate('{{duration}}ms {{delay}}ms {{timing}}'),
        style({ opacity: 0, transform: 'translateX(100%)' }),
      ],
      {
        params: { delay: delayLeave, timing, duration },
      }
    ),
  ]);
}
