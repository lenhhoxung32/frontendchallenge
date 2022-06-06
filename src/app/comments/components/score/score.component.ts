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
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
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
