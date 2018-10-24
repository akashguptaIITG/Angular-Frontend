import { Injectable } from "@angular/core";
import { IUser } from "../Models/user.model";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "./token.service";

@Injectable({
    providedIn:'root',
})

export class UserService{

    token:string=this.tokenService.getToken();
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Token ${this.token}`
        })
    };  
    apiUrl='https://conduit.productionready.io/api';
    constructor(private http:HttpClient,private tokenService:TokenService){}

    logInUser(user:object):Observable<IUser>{
        return this.http.post<IUser>(`${this.apiUrl}/users/login`,user)
    }
    registerUser(user:object):Observable<IUser>{
        console.log(user);
        return this.http.post<IUser>(`${this.apiUrl}/users`,user)
    }
    getUser():Observable<IUser>{
        return this.http.get<IUser>(`${this.apiUrl}/user`,this.httpOptions)
    }
}