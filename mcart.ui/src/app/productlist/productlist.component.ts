import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent {
  products:Product[]=[];
  isLoading = false;
  error!:string;
  searchKeyword!:string;
  constructor(private productService:ProductApiService, private route:ActivatedRoute, private router: Router){
  }
  ngOnInit(): void {
    this.getResults();
  }

  getResults(){
    this.isLoading = true;
    this.productService.getProducts().subscribe((data)=>{
      this.isLoading = false;
      this.products=data
    },error=>this.error=error.message)
    };

    onCardClick(product: any){
      const navigationDetails: string[] = ['/product'];
      navigationDetails.push(product.id);
      this.router.navigate(navigationDetails);
    }
  }


