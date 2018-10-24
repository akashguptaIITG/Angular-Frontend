import { Component, OnInit } from '@angular/core';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';
import { IUser } from '../Models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user:IUser;
  isAuthenticated:boolean=false;
  token:string=this.tokenService.getToken();
  constructor(private tokenService:TokenService,private router:Router,
    private userService:UserService) {
      
    
   }

  ngOnInit() {
      this.isAuthenticated=(this.tokenService.getToken())?true:false;  
      if(this.isAuthenticated){
          this.userService.getUser().subscribe(
            data=>{
              this.user=data["user"]
            }
          )
      }  
  }
  logOut(){
    this.tokenService.destroyToken();
    this.isAuthenticated=false;
    this.router.navigateByUrl('home');
    console.log('logout works')
  }

}
