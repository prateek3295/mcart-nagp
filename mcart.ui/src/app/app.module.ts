import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './admin/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductlistComponent } from './productlist/productlist.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { CarouselitemsComponent } from './components/carouselitems/carouselitems.component';
import { ProductFilterComponent } from './component/product-filter/product-filter.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ProductComponent,
    ProductlistComponent,
    ProductdetailsComponent,
    CarouselitemsComponent,
    ProductFilterComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent], 
})
export class AppModule { }
