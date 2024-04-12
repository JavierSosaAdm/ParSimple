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
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment2 } from '../../enviroments/enviroments';
import { BrowserModule } from '@angular/platform-browser';



// import { AngularFirestoreModule } from '@angular/fire/firestore';

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
    ProductComponent
  ],
  imports: [
    CommonModule,
    NgModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp()),
    provideFirestore(() => getFirestore()),
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
    ProductComponent
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModuleModule { }
