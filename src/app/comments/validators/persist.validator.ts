import { AbstractControl } from '@angular/forms';

export function persist(persistValue: string) {
  return function (
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const controlValue = control.value as string;

    if (controlValue.length === persistValue.length) return { persist: true };

    if (controlValue.substring(0, persistValue.length) !== persistValue) {
      control.setValue(persistValue);
      return { persist: true };
    }

    return null;
  };
}
