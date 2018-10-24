import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../Models/user.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errMSg:string
  constructor(private userService:UserService,private router:Router) { }

  ngOnInit() {
  }

  register(f:NgForm){
    this.userService.registerUser({user:f.value}).subscribe(
      data=>{
        console.log(data["user"]);
      },
    ); 
  }

}
