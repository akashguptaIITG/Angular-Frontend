import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ArticlesService } from '../services/articles.sevice';
import { Router } from '@angular/router';
import { IArticle } from '../Models/article.model';
import { NgOnChangesFeature } from '@angular/core/src/render3';


@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {

  articles:IArticle[];
  private _queryParams:string;
  @Input() set queryParams(value:string){
    
    this._queryParams=value;
    if(this._queryParams!==undefined)
    this.getArticles();
    
  };
  get queryParams():string{
    
    return this._queryParams;
  }

  constructor(private articleService: ArticlesService, private router:Router) {
    
   }
  
  
  ngOnInit() {
        
  
  }

  getArticles(){
    console.log(this.queryParams);
     this.articleService.getAllArticles(this.queryParams).subscribe(data=>{
      this.articles=data["articles"];
     })
  }
}
