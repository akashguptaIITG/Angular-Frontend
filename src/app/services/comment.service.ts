import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IComment } from "../Models/comment.model";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { TokenService } from "./token.service";

@Injectable({
    providedIn:'root',
})
export class CommentService{

    apiUrl='https://conduit.productionready.io/api';
    constructor(private http:HttpClient,private tokenService:TokenService){

    }

    token:string=this.tokenService.getToken();
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Token ${this.token}`
        })
    };
    getComments(slug):Observable<IComment[]>{

       return  this.http.get<IComment[]>(`${this.apiUrl}/articles/${slug}/comments`);
    }
    postComment(slug:string,body:object):Observable<IComment> {
       return this.http.post<IComment>(`${this.apiUrl}/articles/${slug}/comments`,
       body,this.httpOptions);
    }

    deleteComment(slug,id):Observable<IComment>{
        return this.http.delete<IComment>(`${this.apiUrl}/articles/${slug}/comments/${id}`,
        this.httpOptions);
    }

}   