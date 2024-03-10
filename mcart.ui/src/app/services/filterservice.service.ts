import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filterSubject = new Subject<{ gender: string, brands: string[] }>();

  setFilter(filter: { gender: string, brands: string[] }): void {
    console.log(filter.gender);
    console.log(filter.brands);
    this.filterSubject.next(filter);
  }

  getFilter(): Observable<{ gender: string, brands: string[] }> {
    return this.filterSubject.asObservable();
  }
}
