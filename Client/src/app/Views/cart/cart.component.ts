import { Component, Inject } from '@angular/core';
import { CardCartComponent } from '../../Components/card-cart/card-cart.component';
import { loadMercadoPago } from "@mercadopago/sdk-js";
import { HttpClient } from '@angular/common/http'; // Importar HttpClient para hacer peticiones HTTP


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  
  
  toBuy(): void {

  }

  cancel(): void {

  }
}
