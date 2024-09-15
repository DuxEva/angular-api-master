import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  URL = 'https://jsonplaceholder.typicode.com'

  constructor(private http: HttpClient) {}

  getPosts() {
    console.log(this.URL);
    return this.http.get<Post[]>(`${this.URL}/posts`);
  }
}
