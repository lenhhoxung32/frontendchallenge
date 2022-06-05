import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { CustomAnimation, DefaultCustomAnimation } from '@ml/shared/models';

export function fadeInOut(option?: CustomAnimation) {
  option = { ...DefaultCustomAnimation, ...option };
  const { name, delayEnter, delayLeave, duration, timing } = option;
  return trigger(name || 'fadeInOut', [
    state('void', style({ opacity: 0 })),
    transition(
      ':enter',
      group([
        query('*', animateChild()),
        animate('{{duration}}ms {{delay}}ms {{timing}}'),
      ]),
      {
        params: { delay: delayEnter, timing, duration },
      }
    ),
    transition(
      ':leave',
      group([
        query('*', animateChild()),
        animate('{{duration}}ms {{delay}}ms {{timing}}'),
      ]),
      {
        params: { delay: delayLeave, timing, duration },
      }
    ),
  ]);
}
