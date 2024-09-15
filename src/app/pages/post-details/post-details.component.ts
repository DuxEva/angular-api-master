import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post, PostComment, SinglePost } from '../../models';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent implements OnInit {
  post: SinglePost | null = null;
  comments: PostComment[] | null = null;
  loading = true;
  errorMsg: Error | null = null;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.postsService.getPostById(id).subscribe(
          (post) => {
            this.post = post;
          },
          (error) => {
            console.error(error);
            this.loading = false;
            this.errorMsg = error.message;
            console.log(this.errorMsg);
          }
        );

        this.postsService.getCommentsByPostId(id).subscribe(
          (comments) => {
            this.comments = comments;
            this.loading = false;
          },
          (error) => {
            console.error(error);
            this.loading = false;
            this.errorMsg = error.message;
            console.log(this.errorMsg);
          }
        );
      }
    });
  }

  onNavigateEditPost() {
    this.router.navigate([`posts/${this.post?.id}/edit`]);
  }
}
