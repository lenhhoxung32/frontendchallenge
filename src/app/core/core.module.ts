import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './containers';

const CONTAINERS = [AppComponent];

@NgModule({
  imports: [CommonModule, RouterModule, RouterModule],
  declarations: [CONTAINERS],
})
export class CoreModule {}
