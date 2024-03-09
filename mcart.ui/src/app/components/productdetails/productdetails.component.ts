import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductApiService } from 'src/app/product-api.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})

export class ProductdetailsComponent {
  zoomLevel = 1;
  zoomMinLevel = 0.1;
  productId: string;
  
  product:Product;

  constructor(private route: ActivatedRoute, private productService:ProductApiService) {
    this.productId = '';
    this.product = {} as Product
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
      this.fetchProductDetails();
    });
  }

  fetchProductDetails(): void {
    // Assuming ProductService has a method to fetch product details by ID
    this.productService.getProductDetails(this.productId).subscribe((product) => {
      this.product = product;
    });
  }

  zoomIn() {
    this.zoomLevel += 0.1;
    this.applyZoom();
  }

  zoomOut() {
    this.zoomLevel -= 0.1;
    this.applyZoom();
  }

  applyZoom() {
    if (this.zoomLevel < this.zoomMinLevel) {
      this.zoomLevel = this.zoomMinLevel;
    }
    const zoomedImage = document.querySelector('.zoom-image') as HTMLElement;
    zoomedImage.style.transform = `scale(${this.zoomLevel})`;
    zoomedImage.style.transformOrigin = 'center center';  // Set the transform origin to the center
  }
}
