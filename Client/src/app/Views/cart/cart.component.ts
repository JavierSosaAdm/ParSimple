import { Component } from '@angular/core';
import { CardCartComponent } from '../../Components/card-cart/card-cart.component';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
