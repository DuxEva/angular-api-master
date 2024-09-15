import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './posts.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { EditPostComponent } from '../../edit-post/edit-post.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: ':id', component: PostDetailsComponent },
  {
    path: ':id/edit',
    component: EditPostComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostsRoutingModule {}
