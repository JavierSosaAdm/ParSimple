import { Component } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgxPaginationModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 2;
  onPageChange(event: number) {
    this.currentPage = event;
    console.log('esto es currentpage', this.currentPage);
  }
}
