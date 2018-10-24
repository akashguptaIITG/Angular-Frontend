import { Component, OnInit } from '@angular/core';
import { IUser } from '../Models/user.model';
import { UserService } from '../services/user.service';
import { NgForm } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService,
    private tokenService:TokenService,
    private router:Router) { }
  
  user:IUser;
    ngOnInit() {
  }
  login(f:NgForm){
      
    //console.log({user:f.value});
    this.userService.logInUser({user:f.value}).subscribe(
      data=>{
        //console.log({user:f.value});
        console.log(data);
        this.user=data["user"];
        this.tokenService.destroyToken();
        this.tokenService.saveToken(this.user.token);
        console.log(this.tokenService.getToken())
        this.router.navigateByUrl('home');
        location.reload();
      }
    )
  }

}
