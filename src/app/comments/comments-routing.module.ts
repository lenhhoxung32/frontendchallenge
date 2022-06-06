import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewCommentsPageComponent } from './components/view-comments-page/view-comments-page.component';

const routes: Routes = [{ path: '', component: ViewCommentsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsRoutingModule {}
