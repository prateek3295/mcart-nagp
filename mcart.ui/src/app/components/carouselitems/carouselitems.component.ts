import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductApiService } from 'src/app/product-api.service';

@Component({
  selector: 'app-carouselitems',
  templateUrl: './carouselitems.component.html',
  styleUrls: ['./carouselitems.component.css']
})

export class CarouselitemsComponent implements OnInit{
  showCarousel: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  images: string[] = [
    'assets/100.jpg',
    'assets/301.jpg',
  ];

  currentImageIndex = 0;

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
    }, 3000); // Change the duration as needed (in milliseconds)
  }

  nextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
  }

  prevImage(): void {
    this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
  }

  goToCollection():void{

  }
}

