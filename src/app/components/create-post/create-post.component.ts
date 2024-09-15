import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import { Post } from '../../models';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css',
})
export class CreatePostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  createPost() {
    if (this.postForm.valid) {
      const newPost: Post = {
        ...this.postForm.value,
        user_id: 1,
        id: 0,
      };

      this.postsService.createPost(newPost).subscribe(
        (response) => {
          console.log('Post created successfully:', response);
          this.router.navigate(['/posts']);
        },
        (error) => {
          console.error('Error creating post:', error);
        }
      );
    }
  }
}
