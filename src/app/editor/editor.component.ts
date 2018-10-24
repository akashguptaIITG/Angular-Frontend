import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.sevice';
import { NgForm } from '@angular/forms';
import { IArticle } from '../Models/article.model';
import { Router, ActivatedRoute } from '@angular/router';



interface Article{
  title:string,
  description:string,
  body:string,
  tagList:string[],
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})



export class EditorComponent implements OnInit {

  iarticle:IArticle;
  article:Article={} as Article
  constructor(private articleService:ArticlesService,
    private router:Router,
    private activeRoute:ActivatedRoute) { 
    
  }
  slug:string;
  ngOnInit() {
    this.article.tagList=[];
    const routeParams =this.activeRoute.snapshot.params;
    this.slug=routeParams.slug;
    if(this.slug){
      this.articleService.getArticle(this.slug).subscribe(data=>{
        this.article.title=data["article"].title;
        this.article.description=data["article"].description;
        this.article.body=data["article"].body;
        this.article.tagList=data["article"].tagList;
        
      })
    }
  } 
  postArticle(){
  //  this.article.title=f.value.title;
  //  this.article.body=f.value.body;
  //  this.article.description=f.value.description;
   this.articleService.postArticles({article:this.article}).subscribe(data=>{
     this.router.navigateByUrl(`articles/${data["article"].slug}`)
   })
  }
  updateArticle(){
    this.articleService.updateArticle(this.slug,this.article).subscribe(data=>{
      this.slug=data["article"].slug;
      console.log(data["article"]);
      this.router.navigateByUrl(`articles/${data["article"].slug}`);
    })
  }
  addTag(tag){
    if(this.article.tagList.indexOf(tag)<0){
    this.article.tagList.push(tag);
    }
    console.log(this.article.tagList)
    
  } 
  removeTag(tag){
    this.article.tagList.splice(this.article.tagList.indexOf(tag),1);
  }
}
