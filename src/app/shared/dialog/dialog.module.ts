import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DialogComponent, DialogContentComponent } from '.';

const COMPONENTS = [DialogContentComponent, DialogComponent];

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class DialogModule { }
