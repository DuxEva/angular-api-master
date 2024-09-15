import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  isFirstLoad = true;

  constructor(private route: Router) {}

  onNavigatePosts() {
    this.isFirstLoad = false;
    this.route.navigate(['/posts']);
  }
}
