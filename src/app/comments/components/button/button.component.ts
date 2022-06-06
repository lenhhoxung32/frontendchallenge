import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ml-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() name: 'reply' | 'delete' | 'edit' = 'reply';
  @Input() disable = false;

  get src(): string {
    return `assets/images/icon-${this.name}.svg`;
  }

  get textColor(): string {
    if (this.name === 'delete') return 'text-danger';
    return 'text-primary';
  }
}
