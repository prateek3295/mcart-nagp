import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Product } from './model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private apiUrl = 'https://localhost:58224/api/v1/catalog';

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.apiUrl}/uploadImageToS3`, formData, { responseType: 'text' });
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

}
