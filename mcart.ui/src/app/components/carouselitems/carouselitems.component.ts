import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FilterService } from 'src/app/services/filterservice.service';

interface CarouselItem {
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-carouselitems',
  templateUrl: './carouselitems.component.html',
  styleUrls: ['./carouselitems.component.css']
})


export class CarouselitemsComponent implements OnInit{
  showCarousel: boolean = true;
  currentImageIndex = 0;
  items: CarouselItem[] = [
    { imageUrl: 'assets/men.jpg', description: 'Men' },
    { imageUrl: 'assets/women.jpg', description: 'Women' }
  ];
  constructor(private router: Router, private filterService: FilterService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.refreshVisibility();
      }
    });

    this.startCarousel();
  }

  private refreshVisibility(): void {
    this.showCarousel = this.router.url === '/products';;
  }

  startCarousel(): void {
    setInterval(() => {
      this.nextImage();
    }, 5000); // Change the duration as needed (in milliseconds)
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.items.length;
    console.log('Next Image URL:', this.items[this.currentImageIndex].imageUrl);
  }
  
  onImageClick(category: string): void{
    this.filterService.setFilter({
      gender: category,
      brands:[]
    });
  }


}

