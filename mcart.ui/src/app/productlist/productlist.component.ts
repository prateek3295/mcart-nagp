import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductApiService } from '../product-api.service';
import { Router } from '@angular/router';
import { FilterService } from '../services/filterservice.service';
import { Subscription } from 'rxjs';

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
  filter: { gender: string, brands: string[] } = { gender: '', brands: [] };
  constructor(private productService:ProductApiService, private route:ActivatedRoute, private router: Router, private filterService: FilterService){
  }
  ngOnInit(): void {
    this.filterService.getFilter().subscribe(newFilter => {
      this.filter = newFilter;
      // Apply filters when the filter changes
      this.applyFilters();
    });

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

    applyFilters() {
      // Apply filters to update the list of filtered products
      this.filteredProducts = this.products
        .filter(product => {
          // Apply gender filter
          console.log("filter is : " +  this.filter.brands , this.filter.gender);
          if (this.filter.gender && product.category.toLowerCase() !== this.filter.gender.toLowerCase()) {
            return false;
          }
  
          // Apply brand filter
          if (this.filter.brands && this.filter.brands.length > 0 && !this.filter.brands.includes(product.brand)) {
            return false;
          }
  
          return true;
        });
    }
    
    
    
    
  }


