export interface CustomAnimation {
  duration?: number; // ms
  name?: string;
  delayEnter?: number; // ms
  delayLeave?: number; // ms
  timing?: 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
}

export const DefaultCustomAnimation: CustomAnimation = {
  duration: 300,
  delayEnter: 0,
  delayLeave: 0,
  timing: 'ease-in-out',
};
