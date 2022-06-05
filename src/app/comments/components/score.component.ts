import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'ml-score',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="inline-flex items-center gap-2 bg-muted p-2 rounded-lg {{
        direction === 'vertical' ? 'flex-col' : 'flex-row'
      }} "
    >
      <!-- plus -->
      <button
        [disabled]="disablePlus"
        (click)="upScore()"
        type="button"
        class="text-gray-400 px-2 disabled:opacity-20 hover:text-primary"
      >
        <i class="fas fa-plus"></i>
      </button>
      <!-- end plus -->

      <p class="text-primary text-lg font-black">{{ score }}</p>

      <!-- minus -->
      <button
        [disabled]="disableMinus"
        (click)="downScore()"
        type="button"
        class="text-gray-400 px-2 disabled:opacity-20 hover:text-primary"
      >
        <i class="fas fa-minus"></i>
      </button>
      <!-- end minus -->
    </div>
  `,
})
export class ScoreComponent implements OnInit {
  @Input() score!: number;
  @Input() min = 0;
  @Input() max = 10_000;
  @Input() disable = false;
  @Input() direction: 'vertical' | 'horizontal' = 'horizontal';
  @Output() up = new EventEmitter<void>();
  @Output() down = new EventEmitter<void>();
  hasBeenUpScore!: boolean;
  hasBeenDownScore!: boolean;

  ngOnInit(): void {
    this.hasBeenDownScore = false;
    this.hasBeenUpScore = false;
  }

  get disableMinus() {
    return this.disable || this.hasBeenDownScore || this.score === this.min;
  }

  get disablePlus() {
    return this.disable || this.hasBeenUpScore || this.score === this.max;
  }

  upScore() {
    if (this.hasBeenUpScore) return;
    this.up.emit();
    this.hasBeenUpScore = true;
  }

  downScore() {
    if (this.hasBeenDownScore) return;
    this.down.emit();
    this.hasBeenDownScore = true;
  }
}
