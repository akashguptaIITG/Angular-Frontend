import { Observable, from } from "rxjs";
import{IArticle} from  '../Models/article.model';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";

@Injectable({
    providedIn:'root'
})
export class ArticlesService{

    
    constructor(private http:HttpClient,private tokenService:TokenService){

    }
    apiUrl:string=  'https://conduit.productionready.io/api' 
    token:string=this.tokenService.getToken();
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Token ${this.token}`
        })
    };    

     getAllArticles(queryParams:string):Observable<IArticle[]>{
        console.log(`${this.apiUrl}/articles?${queryParams}`);
        return this.http.get<IArticle[]>(`${this.apiUrl}/articles?${queryParams}`)
        
     }
     getArticle(slug):Observable<IArticle>{
        return this.http.get<IArticle>(`${this.apiUrl}/articles/${slug}`);
     }

     postArticles(body:object):Observable<IArticle> {
        return this.http.post<IArticle>(`${this.apiUrl}/articles`,body,this.httpOptions);
     }
     updateArticle(slug,body:object):Observable<IArticle> {
        return this.http.put<IArticle>(`${this.apiUrl}/articles/${slug}`,body,this.httpOptions);
     }
   
     deleteArticle(slug):Observable<IArticle> {
        return this.http.delete<IArticle>(`${this.apiUrl}/articles/${slug}`,this.httpOptions);
     }
     
}