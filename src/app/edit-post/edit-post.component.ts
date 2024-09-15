import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { SinglePost } from '../models';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit {
  postForm: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private postsService: PostsService,
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.postsService.getPostById(this.id).subscribe(
          (post) => {
            this.postForm.patchValue({
              title: post.title,
              body: post.body,
            });
          },
          (error) => {
            console.error(error);
            this.router.navigate(['/posts']);
          }
        );
      }
    });
  }

  savePost() {
    const id = this.route.snapshot.params['id'];
    if (this.postForm.valid) {
      const updatedPost: SinglePost = {
        ...this.postForm.value,
        id,
        userId: 1,
      };

      this.postsService.updatePost(updatedPost).subscribe((response) => {
        console.log('Post updated successfully:', response);
        this.router.navigate([`/posts/${id}`]);
      });
    }
  }

  cancelEdit() {
    this.router.navigate([`/posts/${this.route.snapshot.params['id']}`]);
  }
}
