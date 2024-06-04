import { Component, OnInit, inject} from '@angular/core';
import { CartService } from '../../Services/cart.service';
// import { AuthService } from '../../auth/auth.service';
import { Product } from '../../models/product.model';
import { Cart } from '../../models/cart.model';

@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [],
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css'
})
export class CardCartComponent implements OnInit {
  public carts: Cart[] = [];
  public total: number = 0; 
  
  private _cartService = inject(CartService)
  

  ngOnInit(): void {
    // const cartItems = this._cartService.getCartItems();
    // cartItems.length === 0 ? console.log('no hay productos en el carrito') 
    // : this.carts = cartItems.map((item) => {
    //   return item 
    // }); 
    // console.log('esto es el carrito de card-cart', cartItems);
    
    // this.calculateTotal();
  }
  calculateTotal() {
    // this.total = this.carts.reduce((total, item) => total + (item.product.price * item.product.quantity), 0)
  };

  calculateSubTotal() {
    
  };
  decrement() {
    
  };
  increment() {
    
  };

  removeProduct(id: string) {
    // console.log('esto es el id de la cart', id); 
    // const cartItems = this._cartService.removeCart(id)
    // this.carts = cartItems
    
    // this.calculateTotal();
    
  }
  
}
