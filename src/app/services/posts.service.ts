import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, PostComment, SinglePost } from '../models';
import { catchError, map, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  API_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    console.log(this.API_URL);
    return this.http.get<Post[]>(`${this.API_URL}/posts`).pipe(
      retry(2),
      catchError((error) => {
        throw error;
      })
    );
  }

  getPostById(id: number): Observable<SinglePost> {
    return this.http.get<SinglePost>(`${this.API_URL}/posts/${id}`).pipe(
      retry(2),
      catchError((error) => {
        throw error;
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}/posts`, post).pipe(
      retry(2),
      catchError((error) => {
        throw error;
      })
    );
  }

  updatePost(post: SinglePost): Observable<SinglePost> {
    return this.http.put<SinglePost>(`${this.API_URL}/posts/${post.id}`, post);
  }

  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    return this.http
      .get<PostComment[]>(`${this.API_URL}/posts/${postId}/comments`)
      .pipe(
        retry(2),
        catchError((error) => {
          throw error;
        })
      );
  }
}
