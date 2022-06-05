import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent, DialogNgContentComponent } from '.';

const COMPONENTS = [DialogNgContentComponent, DialogComponent];

@NgModule({
  imports: [CommonModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class DialogModule {}
