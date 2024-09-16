import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, PostComment, SinglePost } from '../models';
import { catchError, map, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  API_URL = 'https://jsonplaceholder.typicode.com';

  private postsCache: { data: Post[]; expiry: number } | null = null;
  private singlePostCache: {
    [id: number]: { data: SinglePost; expiry: number };
  } = {};
  private commentsCache: {
    [postId: number]: { data: PostComment[]; expiry: number };
  } = {};

  private cacheDuration = 3 * 60 * 1000;

  constructor(private http: HttpClient) {}

  private isCacheValid(cache: { expiry: number } | null): boolean {
    return cache !== null && cache.expiry > Date.now();
  }

  getPosts(): Observable<Post[]> {
    if (this.postsCache && this.isCacheValid(this.postsCache)) {
      return of(this.postsCache.data);
    }

    return this.http.get<Post[]>(`${this.API_URL}/posts`).pipe(
      map((posts) => {
        this.postsCache = {
          data: posts,
          expiry: Date.now() + this.cacheDuration,
        };
        return posts;
      }),
      catchError((error) => {
        console.error('Error fetching posts', error);
        return throwError(error);
      })
    );
  }

  getPostById(id: number): Observable<SinglePost> {
    if (
      this.singlePostCache[id] &&
      this.isCacheValid(this.singlePostCache[id])
    ) {
      return of(this.singlePostCache[id].data);
    }

    
    return this.http.get<SinglePost>(`${this.API_URL}/posts/${id}`).pipe(
      map((post) => {
        this.singlePostCache[id] = {
          data: post,
          expiry: Date.now() + this.cacheDuration,
        };
        return post;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.API_URL}/posts`, post).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  updatePost(post: SinglePost): Observable<SinglePost> {
    return this.http
      .put<SinglePost>(`${this.API_URL}/posts/${post.id}`, post)
      .pipe(
        catchError((error) => {
          console.error(`Error updating post ${post.id}`, error);
          return throwError(error);
        })
      );
  }

  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    if (
      this.commentsCache[postId] &&
      this.isCacheValid(this.commentsCache[postId])
    ) {
      return of(this.commentsCache[postId].data);
    }

    return this.http
      .get<PostComment[]>(`${this.API_URL}/posts/${postId}/comments`)
      .pipe(
        map((comments) => {
          this.commentsCache[postId] = {
            data: comments,
            expiry: Date.now() + this.cacheDuration,
          };
          return comments;
        }),
        catchError((error) => {;
          return throwError(error);
        })
      );
  }

  clearCache(): void {
    this.postsCache = null;
    this.singlePostCache = {};
    this.commentsCache = {};
  }
}
