import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent {
  posts: Post[] = [];
  paginatedPosts: Post[] = [];
  currentPage = 1;
  postsPerPage = 10;
  totalPages: number = 0;
  loading = true;

  constructor(private postsService: PostsService) {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe((posts) => {
      this.posts = posts;
      this.loading = false;
      this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
      this.paginatePosts();
    });
  }

  paginatePosts() {
    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    const endIndex = startIndex + this.postsPerPage;
    this.paginatedPosts = this.posts.slice(startIndex, endIndex);
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.paginatePosts();
  }
}
