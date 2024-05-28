import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MercadoPagoConfig, Payment, User } from 'mercadopago'; // Importa los elementos necesarios de Mercado Pago
import { accesToken } from '../../../enviroments/enviroments'; // Importa tu token de acceso desde tus entornos
import { CardCartComponent } from '../../Components/card-cart/card-cart.component'
import { CartService } from '../../Services/cart.service';
import { Product } from '../../models/product.model';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardCartComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  public carts: {product: {product: Product, id: string}, quantity: number } [] = [];
  public total: number = 0; 
  private _cartService = inject(CartService)
  private _authService = inject(AuthService)
  private current: string | undefined = '';
  
  
  ngOnInit(): void {
    const cartItems = this._cartService.getCartItems();
    cartItems.length === 0 ? console.log('no hay productos en el carrito') 
    : this.carts = cartItems.map((product) => {
      return { product, quantity: 1 } 
    }); 
    console.log(cartItems);
    
    this.calculateTotal();
    this._authService.getCurrentUser().subscribe((data) => {
      if (data) {
        this.current = data.email?.toString()
        console.log('Este es el mail autenticado', this.current);
      }
    })
  }
  calculateTotal() {
    this.total = this.carts.reduce((total, item) => total + (item.product.product.price * item.quantity), 0)
  };

  ngOnChanges(changes: SimpleChanges): void {
    
  }
  async toBuy() {
    // Inicializa el objeto cliente directamente con tu token de acceso
    const client = new MercadoPagoConfig({ accessToken: accesToken.token });
    
    // // Crea el objeto de pago con el cliente inicializado
    const payment = new Payment(client);

    // Define el cuerpo de la solicitud para realizar el pago
    const body = {
      total_amount: this.total,
      // description: this.carts.map((item) => item.product.name).join(', ').toString(),
      payment_method_id: '', // Reemplaza con el ID del método de pago
      payer: {
        email: this.current // Reemplaza con el correo electrónico del pagador 
      },
    };
    console.log('esto es body: -->', body);

    const requestOptions = {
      idempotencyKey: '<IDEMPOTENCY_KEY>',
    };
    // Realiza la solicitud de pago
    payment.create({ body })
      .then(response => console.log('Respuesta de la solicitud de pago:', response))
      .catch(error => console.error('Error al realizar la solicitud de pago:', error));
  }

  cancel(): void {
    // Implementa la lógica para cancelar el pago si es necesario
  }
}
