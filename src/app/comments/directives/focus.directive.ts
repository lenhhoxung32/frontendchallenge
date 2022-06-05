import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ selector: '[focus]' })
export class FocusDirective implements OnInit {
  @Input() focus = false;

  constructor(private readonly _elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.focus) {
      this._elementRef.nativeElement.focus();
    }
  }
}
