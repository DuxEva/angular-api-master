import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsComponent } from './posts.component';
import { PaginatorComponent } from '../../components/paginator/paginator.component';

@NgModule({
  declarations: [PostsComponent, PaginatorComponent],
  imports: [CommonModule, PostsRoutingModule],
})
export class PostsModule {}
