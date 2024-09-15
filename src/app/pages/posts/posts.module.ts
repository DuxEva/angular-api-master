import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { PostDetailsComponent } from '../post-details/post-details.component';

@NgModule({
  declarations: [PostsComponent, PaginatorComponent, PostDetailsComponent],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
