import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductApiService } from 'src/app/product-api.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Input() brands: string[] = [];
  @Output() filtersChanged: EventEmitter<{ gender: string, selectedBrands: string[] }> = new EventEmitter();

  selectedGender: string = '';
  brandCheckboxes: { [brand: string]: boolean } = {};

  constructor(private productService: ProductApiService) { }

  @Output() filterChange = new EventEmitter<any>();



  ngOnInit() {
    // Fetch brands from your service or provide them as needed
    this.loadBrandList()// Replace with your actual brand data
  }



  loadBrandList() {
    this.productService.getUniqueBrands().subscribe(
      (data) => {
        this.brands = data;
        this.brands.forEach(brand => this.brandCheckboxes[brand] = false);
        // Emit the initial filters
        this.emitFilterChange();
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }

  emitFilterChange() {
    const selectedBrands = Object.keys(this.brandCheckboxes).filter(brand => this.brandCheckboxes[brand]);
    console.log(selectedBrands);
    this.filtersChanged.emit({ gender: this.selectedGender, selectedBrands });
  }

}
