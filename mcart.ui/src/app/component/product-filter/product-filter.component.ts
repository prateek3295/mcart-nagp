import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductApiService } from 'src/app/product-api.service';
import { FilterService } from 'src/app/services/filterservice.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input() brands: string[] = [];
  
  genderFilter: string = ''; // Variable to hold the selected gender
  brandCheckboxes: { [key: string]: boolean } = {};

  constructor(private productService: ProductApiService, private filterService: FilterService) { }


  ngOnInit() {

    this.filterService.getSearchQuery().subscribe(searchQuery => {
      this.loadBrandList(searchQuery);
    });
    // Fetch brands from your service or provide them as needed
    this.loadBrandList("")// Replace with your actual brand data
  }



  loadBrandList(searchQuery: string) {
    this.productService.getUniqueBrands(searchQuery).subscribe(
      (data) => {
        this.brands = data;
        this.brands.forEach(brand => {
          this.brandCheckboxes[brand] = false;
        });
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  applyFilters() {
    // Collect selected brands
    const selectedBrands = Object.keys(this.brandCheckboxes).filter(brand => this.brandCheckboxes[brand]);

    // Emit the filter to the FilterService
    this.filterService.setFilter({
      gender: this.genderFilter,
      brands: selectedBrands
    });
  }

}
