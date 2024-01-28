import { Component } from '@angular/core';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import awsConfig from 'src/aws-exports'
import { Amplify } from 'aws-amplify';
import { Router } from '@angular/router';
import { Hub } from 'aws-amplify/utils';

Amplify.configure(awsConfig);


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  ngOnInit() {
    Hub.listen('auth', ({ payload }) => {
      switch (payload.event) {
        case 'signedIn':
          this.router.navigateByUrl("/");
          break;
        case 'signedOut':
          this.router.navigateByUrl("login");
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
    
  }
  constructor(private router: Router){
  }
}


