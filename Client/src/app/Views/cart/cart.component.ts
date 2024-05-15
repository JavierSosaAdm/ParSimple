import { Component, OnInit, inject } from '@angular/core';
import { MercadoPagoConfig, Payment } from 'mercadopago'; // Importa los elementos necesarios de Mercado Pago
import { accesToken } from '../../../enviroments/enviroments'; // Importa tu token de acceso desde tus entornos
import { CardCartComponent } from '../../Components/card-cart/card-cart.component'
import { CartService } from '../../Services/cart.service';
import { Product } from '../../models/product.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public carts: {product: Product; quantity: number;} [] = [];
  public total: number = 0; 
  
  private _cartService = inject(CartService)
  ngOnInit(): void {
    const cartItems = this._cartService.getCartItems();

    cartItems.length === 0 ? console.log('no hay productos en el carrito') 
    : this.carts = cartItems.map((product) => {
      return { product, quantity: 1 } 
    }); 
    this.calculateTotal();
    console.log('prod agreg al carr: ', this.carts)
  }
  calculateTotal() {
    this.total = this.carts.reduce((total, item) => total + (item.product.price * item.quantity), 0)
    console.log('esto es el total', this.total);
  };

  
  async toBuy() {
    // Inicializa el objeto cliente directamente con tu token de acceso
    const client = new MercadoPagoConfig({ accessToken: accesToken.token });
    
    // // Crea el objeto de pago con el cliente inicializado
    const payment = new Payment(client);

    // Define el cuerpo de la solicitud para realizar el pago
    const body = {
      transaction_amount: 12.34,
      description: 'Descripción del pago',
      payment_method_id: '', // Reemplaza con el ID del método de pago
      payer: {
        email: 'correo_electronico@example.com' // Reemplaza con el correo electrónico del pagador
      },
    };
    console.log('esto es body: -->', body);
    
    // Realiza la solicitud de pago
    payment.create({ body })
      .then(response => console.log('Respuesta de la solicitud de pago:', response))
      .catch(error => console.error('Error al realizar la solicitud de pago:', error));
  }

  cancel(): void {
    // Implementa la lógica para cancelar el pago si es necesario
  }
}
