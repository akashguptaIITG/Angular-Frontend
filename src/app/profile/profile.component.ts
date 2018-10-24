import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { IProfile } from '../Models/profile.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService:ProfileService,private activeRoute:ActivatedRoute) { 
    
  }

  query:string;
  profile:IProfile;

  ngOnInit() {

    const routeParams =this.activeRoute.snapshot.params;
    this.profileService.getProfile(routeParams.username).subscribe(data=>{
      this.profile=data["profile"];
      this.query=`author=${this.profile.username}`;
      console.log(this.query);
    })

  } 

}
