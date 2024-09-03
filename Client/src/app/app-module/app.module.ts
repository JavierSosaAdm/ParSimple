import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from '../Views/product/product.component';
import { HomeComponent } from '../Views/home/home.component';
import { AboutComponent } from '../Views/about/about.component';
import { CartComponent } from '../Views/cart/cart.component';
import { DetailComponent } from '../Views/detail/detail.component';
import { LoginComponent } from '../Views/Forms/login/login.component';
import { FormUserComponent } from '../Views/Forms/form-user/form-user.component';
import { ClientsComponent } from '../Views/Dashboard/Views/clients/clients.component';
import { OrdersComponent } from '../Views/Dashboard/Views/orders/orders.component';
import { PaymentsComponent } from '../Views/Dashboard/Views/payments/payments.component';
import { ProductComponent } from '../Views/Dashboard/Views/products/products.component';
import { AppComponent } from '../app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { enviroment } from '../../../enviroment.prod';
import { FireService } from '../Services/fire.service';
import { ProductService } from '../Services/product.service';
import { UserService } from '../Services/user.service';
import { FavoritesComponent } from '../Views/favorites/favorites.component';
import { CardCartComponent } from '../Components/card-cart/card-cart.component';
import { ClientComponent } from '../Views/client/client.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

// import { SearchComponent } from '../Components/search/search.component';


@NgModule({
  declarations: [
    ProductsComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    DetailComponent,
    LoginComponent,
    FormUserComponent,
    ClientsComponent,
    OrdersComponent,
    PaymentsComponent,
    ProductComponent,
    FavoritesComponent,
    CardCartComponent,
    ClientComponent
    // SearchComponent
  ],
  imports: [
    CommonModule,
    NgModule,
    FormsModule,
    AngularFireModule.initializeApp(enviroment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  exports: [
    ProductsComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    DetailComponent,
    LoginComponent,
    FormUserComponent,
    ClientsComponent,
    OrdersComponent,
    PaymentsComponent,
    ProductComponent,
    FavoritesComponent,
    CardCartComponent,
    ClientComponent
    // SearchComponent
  ],
  bootstrap: [AppComponent],
  providers: [
    FireService, 
    ProductService, 
    UserService, 
    provideHttpClient(
      withFetch() 
    )]
})
export class AppModuleModule { }
