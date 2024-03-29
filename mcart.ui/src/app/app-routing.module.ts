import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './admin/product/product.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductdetailsComponent } from './components/productdetails/productdetails.component';
import { ProductlistComponent } from './productlist/productlist.component';


const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path:"login", component:LoginComponent},
  {path:"addproduct", component:ProductComponent},
  {path: 'products', component:ProductlistComponent},
  {path: 'product/:id', component:ProductdetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
