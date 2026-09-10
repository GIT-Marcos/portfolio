/**
 * Animación personalizada para View Transitions:
 * Efecto de estática CRT con fade-in.
 *
 * Uso:
 *   import { staticFadeIn } from '@transitions/static-fade-in';
 *   <main transition:animate={staticFadeIn}>
 */

const anim = {
  old: {
    name: 'static-fade-in-old',
    duration: '0.4s',
    easing: 'ease-in',
  },
  new: {
    name: 'static-fade-in-new',
    duration: '0.5s',
    easing: 'ease-out',
  },
};

export const staticFadeIn = {
  forwards: anim,
  backwards: anim,
};
