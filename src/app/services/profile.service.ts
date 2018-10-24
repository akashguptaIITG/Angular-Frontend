import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IProfile } from "../Models/profile.model";

@Injectable({
    providedIn:'root',
})
export class ProfileService{

    apiUrl='https://conduit.productionready.io/api';
    constructor(private http:HttpClient){

    }
    getProfile(username):Observable<IProfile>{

       return  this.http.get<IProfile>(`${this.apiUrl}/profiles/${username}`);
    }

}   