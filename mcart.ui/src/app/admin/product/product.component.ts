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
  newcategories: string = '';
  newProduct = {
    name: '',
    category: '',
    summary: '',
    brand:'',
    price:'',
    imageUrl: '',
    categories: [] as string[],
    rating:0,
    inStock:false
  };

   // Define an array for star ratings
   stars: number[] = [1, 2, 3, 4, 5];

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
    debugger;
    this.newProduct.categories = this.newcategories.split(',').map(category => category.trim());
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

 
  // Method to set the rating based on the selected star
  setRating(rating: number) {
    this.newProduct.rating = rating;
  }
}
