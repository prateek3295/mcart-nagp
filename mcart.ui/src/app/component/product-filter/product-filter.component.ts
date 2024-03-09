import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  @Output() filterChanged = new EventEmitter<any>();
  filters: any = {}; // Object to store filter criteria

  constructor() { }

  ngOnInit(): void {
  }

  applyFilters(): void {
    // Emit filter changes to parent component
    this.filterChanged.emit(this.filters);
  }
}
