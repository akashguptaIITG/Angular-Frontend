import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,ActivatedRoute, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { TokenService } from './token.service';
import { stringify } from '@angular/core/src/util';
import { UserService } from './user.service';
import { ArticlesService } from './articles.sevice';

@Injectable({
    providedIn:'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private tokenService:TokenService,
    private activeRoute:ActivatedRoute,
    private userService:UserService,
    private articleService:ArticlesService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    
    

    if(this.tokenService.getToken()){
      
        // let slug =this.activeRoute.snapshot.params.slug;
        // let username1='3';
        // let username2='4';
        // if(slug!==undefined){
        //        this.articleService.getArticle(slug).subscribe(
        //         data=>{
        //             username1=data["article"].author.username;
        //             console.log(data["article"]);
        //         }
        //        ) 
        //        this.userService.getUser().subscribe(data=>{
        //            username2=data["user"].username;
        //        })
        //        console.log(username1,username2);
        //      if(username1===username2){
        //          return true;
        //      }  
        //      else{
        //         this.router.navigateByUrl('login');
        //          false;
        //      }
        // }else{

            return true;
        
    
        
    }
    else{
        this.router.navigateByUrl('login');
        return false;
    }
    

  }
}