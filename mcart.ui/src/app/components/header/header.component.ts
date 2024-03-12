import { Component } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import { fetchUserAttributes, getCurrentUser, signOut } from 'aws-amplify/auth';
import  { Hub } from 'aws-amplify/utils';
import { ProductApiService } from 'src/app/product-api.service';
import { FilterService } from 'src/app/services/filterservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 
  isLoggedIn=false;
  username:string = "";
  searchQuery: string = '';
  hideSearchBox: boolean = false;
  constructor(private filterService: FilterService, private router: Router){
   
  }
  
 

  ngOnInit(){
    
    this.router.events.subscribe((event) => {
      console.log(this.router.url);
      // Check the current route and hide the search box if needed
      const currentRoute = this.router.url;

      // Add conditions based on your route structure
      this.hideSearchBox = currentRoute.includes('/product/');
    });
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          this.isLoggedIn = true;
          fetchUserAttributes();
          break;
        case 'signedOut':
          this.isLoggedIn = false;
          console.log('logged out');
          break;
        case 'tokenRefresh':
          console.log('auth tokens have been refreshed.');
          break;
        case 'tokenRefresh_failure':
          console.log('failure while refreshing auth tokens.');
          break;
        case 'signInWithRedirect':
          console.log('signInWithRedirect API has successfully been resolved.');
          break;
        case 'signInWithRedirect_failure':
          console.log('failure while trying to resolve signInWithRedirect API.');
          break;
        case 'customOAuthState':
          break;
      }
    });

  fetchUserAttributes()
    .then(data => {
        this.isLoggedIn = true;
        this.username = data.preferred_username as string;
        console.log(data);
  })
  .catch(e => {
   console.log("error on getting current user " + e);
  });
  }

logout(){
    signOut();
  }

searchProducts(): void{
    this.filterService.setSearchQuery(this.searchQuery);;
  }

}
