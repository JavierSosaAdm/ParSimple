import { Component, OnInit, inject} from '@angular/core';
import { CartService } from '../../Services/cart.service';
// import { AuthService } from '../../auth/auth.service';
import { Product } from '../../models/product.model';


@Component({
  selector: 'app-card-cart',
  standalone: true,
  imports: [],
  templateUrl: './card-cart.component.html',
  styleUrl: './card-cart.component.css'
})
export class CardCartComponent implements OnInit {
  public carts: {product: Product; quantity: number;} [] = [];
  public total: number = 0; 
  public subTotal: number = 0;
  public quantity: number = 1;
  private _cartService = inject(CartService)
  

  ngOnInit(): void {
    const cartItems = this._cartService.getCartItems();
    cartItems.length === 0 ? console.log('no hay productos en el carrito') 
    : this.carts = cartItems.map((product) => {
      return { product, quantity: 1 } 
    }); 
    console.log('esto es el carrito de card-cart', cartItems);
    
    this.calculateTotal();
  }
  calculateTotal() {
    this.total = this.carts.reduce((total, item) => total + (item.product.price * item.quantity), 0)
  };

  calculateSubTotal() {
    const items = this.carts.map((item) => this.subTotal + (item.product.price * item.quantity), 0 )
    // this.subTotal = 
  };
  decrement(product: {product: Product, quantity: number}) {
    if (product.quantity > 1) {
      product.quantity--
    }
    this.calculateTotal();
  };
  increment(product: {product: Product, quantity: number}) {
    if (product.quantity < 10) {
      product.quantity++
    }
    this.calculateTotal();
  };

  removeProduct(productToRemove: { product: Product; quantity: number }) {
    const upDateCarts = this.carts.filter(item => item !== productToRemove) 
    this.carts = upDateCarts;
    this.calculateTotal();
  }
  
}
