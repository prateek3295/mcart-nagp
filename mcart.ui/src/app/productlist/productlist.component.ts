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
  filteredProducts: Product[] = [];
  selectedGender: string = '';
  filters: any = {};
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
      this.products=data;
      this.filteredProducts = data;
    },error=>this.error=error.message)
    };

   

    onCardClick(product: any){
      const navigationDetails: string[] = ['/product'];
      navigationDetails.push(product.id);
      this.router.navigate(navigationDetails);
    }

    isFilledStar(index: number, product: Product): boolean {
      return index < product.rating;
    }

    applyFilters(filters: { gender: string, selectedBrands: string[] }) {
      console.log(this.filters.selectedBrands);
      // Update the selected gender and apply filters
      this.selectedGender = filters.gender;
      this.filterProducts(filters.selectedBrands);
    }

    filterProducts(selectedBrands: string[]) {
      // Apply filters to the products
      this.filteredProducts = this.products
        .filter(product => {
          // Apply gender filter
          if (this.selectedGender && this.selectedGender !== '' && product.category !== this.selectedGender) {
            return false;
          }
  
          // Apply brand filter (if needed)
          if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) {
            return false;
          }
  
          return true;
        });
    }
  }


