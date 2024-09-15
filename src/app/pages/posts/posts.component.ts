import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models';
import { Router } from '@angular/router';

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
  errorMsg: Error | null = null;

  constructor(private postsService: PostsService, private route: Router) {
    this.getPosts();
  }

  getPosts() {
    this.postsService.getPosts().subscribe(
      (posts) => {
        this.posts = posts;
        this.totalPages = Math.ceil(this.posts.length / this.postsPerPage);
        this.paginatePosts();
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
        this.errorMsg = error.message;
        console.log(this.errorMsg);
      },
      () => {
        console.log('completed');
        this.loading = false;
      }
    );
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

  navigateToPost(id: number) {
    console.log(`Navigating to post ${id}`);
    this.route.navigate([`/posts/${id}`]);
  }
}
