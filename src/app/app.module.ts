import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {​​​​​​​​FormsModule}​​​​​​​​ from'@angular/forms';
import{​​​​​​​​ HttpClientModule}​​​​​​​​ from'@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { RegisterComponent } from './register/register.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { ViewproductsComponent } from './viewproducts/viewproducts.component';
import { PreComponent } from './pre/pre.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    ProductdetailsComponent,
    RegisterComponent,
    ViewcartComponent,
    ViewproductsComponent,
    PreComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
