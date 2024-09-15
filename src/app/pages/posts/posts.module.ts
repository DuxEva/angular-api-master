import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PostDetailsComponent } from '../post-details/post-details.component';
import { EditPostComponent } from '../../edit-post/edit-post.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PostsComponent,
    PaginatorComponent,
    PostDetailsComponent,
    EditPostComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, ReactiveFormsModule],
})
export class PostsModule {}
