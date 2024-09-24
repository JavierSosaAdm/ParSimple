import { Routes } from '@angular/router';
import { HomeComponent } from './Views/home/home.component';
import { LoginComponent } from './Views/Forms/login/login.component';
import { FormUserComponent } from './Views/Forms/form-user/form-user.component';
import { ProductsComponent } from './Views/product/product.component';
import { AboutComponent } from './Views/about/about.component';
import { CartComponent } from './Views/cart/cart.component';
import { DetailComponent } from './Views/detail/detail.component';
import { ClientsComponent } from './Views/Dashboard/Views/clients/clients.component';
import { OrdersComponent } from './Views/Dashboard/Views/orders/orders.component';
import { PaymentsComponent } from './Views/Dashboard/Views/payments/payments.component';
import { ProductComponent } from './Views/Dashboard/Views/products/products.component';
import { FavoritesComponent } from './Views/favorites/favorites.component';
import { ClientComponent } from './Views/client/client.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:id', component: DetailComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: FormUserComponent},
    {path: 'cart', component: CartComponent},
    {path: 'about', component: AboutComponent},
    {path: 'clients', component: ClientsComponent},
    {path: 'order', component: OrdersComponent},
    {path: 'payments', component: PaymentsComponent},
    {path: 'productsdashboard', component: ProductComponent},
    {path: 'favorites', component: FavoritesComponent},
    {path: 'client', component: ClientComponent},
    {path: '**', redirectTo: '', pathMatch: 'full'}
];
