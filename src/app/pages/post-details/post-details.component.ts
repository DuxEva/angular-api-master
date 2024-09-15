import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post, PostComment, SinglePost } from '../../models';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.css',
})
export class PostDetailsComponent {
  post: SinglePost | null = null;
  comments: PostComment[] = [];
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        const id = Number(params.get('id'));
        this.postsService.getPostById(id).subscribe((post) => {
          this.post = post;
        });

        this.postsService.getCommentsByPostId(id).subscribe((comments) => {
          this.comments = comments;
        });
      }
    });
  }
}
