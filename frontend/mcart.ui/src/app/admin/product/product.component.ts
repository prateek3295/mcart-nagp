import { Component } from '@angular/core';
import { ProductApiService } from 'src/app/product-api.service';
import { FormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  newProduct = {
    name: '',
    category: '',
    summary: '',
    price:'',
    imageUrl: '' // This property will store the S3 URL of the uploaded image
  };

  constructor(private productService: ProductApiService) {}

  onFileSelected(event: any) {
    console.log("file selected");
    const selectedFile = event.target.files[0];
    
    if (selectedFile) {
      this.uploadImageToS3(selectedFile);
    }
  }

  uploadImageToS3(selectedFile: any) {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    this.productService.uploadImage(selectedFile).subscribe(
      (data) => {
        console.log("response " + data);
        this.newProduct.imageUrl = data;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  createProduct() {
    // Perform logic to save the new product, including the S3 URL, to the database
    this.productService.createProduct(this.newProduct).subscribe(
      () => {
        console.log('Product created successfully.');
      },
      () => {
        console.error('Error creating product:');
      }
    );
  }
}
