import { trigger, state, style, transition, animate } from '@angular/animations';

export const showHideAnimation = trigger('showHide', [
  state(
    'visible',
    style({
      opacity: 1,
    })
  ),
  state(
    'invisible',
    style({
      opacity: 0,
      visibility: 'hidden',
    })
  ),
  transition('visible <=> invisible', [animate('150ms')]),
]);