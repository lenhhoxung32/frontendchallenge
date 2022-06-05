import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCommentsPageComponent } from './containers';

const routes: Routes = [{ path: '', component: ViewCommentsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsRoutingModule {}
