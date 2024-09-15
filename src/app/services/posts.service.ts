import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models';
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

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/posts/${id}`).pipe(
      retry(2),
      catchError((error) => {
        throw error;
      })
    );
  }
}
