import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
})
export class PaginatorComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChanged = new EventEmitter<number>();

  goToPage(page: number) {
    this.pageChanged.emit(page);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  get totalPagesArray() {
    return Array(this.totalPages).fill(0);
  }
}
