import { animate, state, style, transition, trigger } from "@angular/animations";

export const container = trigger('slideIn', [
  state('void', style({ opacity: 0, transform: 'translateX(-100%)' })),
  transition(':enter', [
    animate(
      '300ms ease-in',
      style({ opacity: 0, transform: 'translateX(-100%)' })
    ),
  ]),
]);
