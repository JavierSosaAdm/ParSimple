import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from '../product/product.component';
import { CardsComponent } from '../../Components/cards/cards.component';
import { ProductService } from '../../Services/product.service';
import { Product } from '../../models/product.model';
import { Router } from 'express';
import { SearchComponent } from '../../Components/search/search.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  ngOnInit(): void {
    
  }
}
