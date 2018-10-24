import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { TokenService } from './token.service';

@Injectable({
    providedIn:'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService:TokenService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    
    if(this.tokenService.getToken()){
        
        this.router.navigateByUrl('home');
        return false;
        
    }
    else{
        
        return true;
    }
    

  }
}