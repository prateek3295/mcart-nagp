import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from './model/product';
import { fetchAuthSession } from 'aws-amplify/auth';
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private apiUrl = "http://catalog-lb-437426044.us-east-1.elb.amazonaws.com/api/v1/catalog/" ;

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}uploadImageToS3`, formData, { responseType: 'text' });
  }

  createProduct(product: any): Observable<any> {
  
    return this.http.post(`${this.apiUrl}`, product);
  }

  getProducts():Observable<Product[]|any>{
    return this.http.get<{[key:string]:Product}>(this.apiUrl).pipe(map((data)=>{
      let newProducts:Product[]=[];
      for(const key in data){
        newProducts.push({...data[key]})
        console.log(data[key]);
      }
      return newProducts;
    }),
    catchError((error)=>{
      return throwError(error); //throwError is deprecated
      // return new Error(error);
    }));
  }

   // Fetch unique brands from the backend
   getUniqueBrands(): Observable<string[]> {
    const url = `${this.apiUrl}GetProductBrands`; // Adjust the endpoint accordingly
    return this.http.get<string[]>(url);
  }

  getProductDetails(productId: string): Observable<any> {
    const url = `${this.apiUrl}${productId}`;
    return this.http.get<any>(url);
  }

}
