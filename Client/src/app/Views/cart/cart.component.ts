import { Component, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MercadoPagoConfig, Payment, User } from 'mercadopago'; // Importa los elementos necesarios de Mercado Pago
import { accesToken } from '../../../enviroments/enviroments'; // Importa tu token de acceso desde tus entornos
import { CardCartComponent } from '../../Components/card-cart/card-cart.component';
import { CartService } from '../../Services/cart.service';
import { v4 as uuidv4 } from 'uuid'; 
import { AuthService } from '../../auth/auth.service';
import { Cart } from '../../models/cart.model';
import { Observable } from 'rxjs';
import { AppConfigService } from '../../Services/app-config.service';
import { loadMercadoPago } from '@mercadopago/sdk-js';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardCartComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  public carts: Cart[] = [];
  public total: number = 0; 
  private _cartService = inject(CartService)
  private _authService = inject(AuthService)
  private current: string | undefined = '';
  private _appConfigService = inject(AppConfigService)
  private nodeVersion: string = '';
  private trackingId: string = '';
  
  getCarts() {
    this.carts = this._cartService.getCartItems()
  } 
  ngOnInit() {
    this.nodeVersion = this._appConfigService.getNodeVersion()

    this.getCarts();
    console.log('esto es carts ahora: ', this.carts);
    this.carts.length === 0 ? console.log('No hay productos en el carrito')
    : this.carts.map((item) => {
      return item
    })

    this._authService.getCurrentUser().subscribe((data) => {
      if (data) {
        this.current = data.email?.toString()
        console.log('esto es current: -->', this.current);
        
      }
    })
    this.calculateTotal()
  }
  
  decrement(item: Cart) {

    if (item.product_quantity > 1) {
      item.product_quantity--;
      this._cartService.updateQantity(item)
      this.calculateTotal()
    } else {
      console.log('Debe haber al menos dos productos');   
    }
  };
  increment(item: Cart) {
    
    if (item.product_quantity < 10) {
      item.product_quantity++;
      this._cartService.updateQantity(item)
      this.calculateTotal()
    } else {
      console.log('Solo se pueden comprar hasta 10 productos'); 
    }
  }
  calculateTotal() {
    this.total = this.carts.reduce((total, item) => total + (item.products.price * item.product_quantity), 0)
  };
  
  removeProduct(id: string) {
    this._cartService.removeCart(id)
    this.getCarts()
    this.calculateTotal()
  }
  async toBuy () {
    // await loadMercadoPago();
    // const mp = new MercadoPago("YOUR_PUBLIC_KEY");
    // Inicializa el objeto cliente directamente con tu token de acceso
    
    const client = new MercadoPagoConfig({ accessToken: accesToken.token });

    // // Crea el objeto de pago con el cliente inicializado
    const payment = new Payment(client);
    
    // Define el cuerpo de la solicitud para realizar el pago
    const body = {
      
      total_amount: this.total,
      description: this.carts.map((item) => item.products.name).join(', ').toString(),
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
      console.log('Cancelar pedido');
      
      // Implementa la lógica para cancelar el pago si es necesario
    }
}

