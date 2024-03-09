import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselitemsComponent } from './carouselitems.component';

describe('CarouselitemsComponent', () => {
  let component: CarouselitemsComponent;
  let fixture: ComponentFixture<CarouselitemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselitemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
