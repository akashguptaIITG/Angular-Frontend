import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.sevice';
import { IArticle } from '../Models/article.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { IComment } from '../Models/comment.model';
import { NgForm } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from '../services/user.service';
import { IUser } from '../Models/user.model';

@Component({
  
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articlesService:ArticlesService,
    private activeRoute:ActivatedRoute,
    private commentService: CommentService ,
    private userService:UserService,
    private router:Router) { 

      
    }
  comments:IComment[];
  article:IArticle;
  slug:string;
  user:IUser;
  canModify:boolean=false;
  ngOnInit() {

    const routeParams =this.activeRoute.snapshot.params;
    this.slug=routeParams.slug;
    
    this.articlesService.getArticle(routeParams.slug).subscribe(data=>{
      this.article=data["article"];
      console.log(this.article)
      this.getUser();
      
      
    })
    this.commentService.getComments(routeParams.slug).subscribe(data=>{
      this.comments=data["comments"];
      console.log(this.comments);
    })

    console.log(this.article);
    
  }
  postComment(f:NgForm){
    this.commentService.postComment(this.slug,{comment:f.value}).subscribe(
      data=>{
        console.log(data);
       this.comments.unshift(data["comment"]);
       f.resetForm();
      }
    )
  }

  deleteArticle(){  

    console.log("delete works")
    this.articlesService.deleteArticle(this.slug).subscribe(data=>{
      console.log(data);
      this.router.navigateByUrl(`profiles/${this.article.author.username}`)
    });
    
  } 

  getUser(){
    this.userService.getUser().subscribe(data=>{
      this.user=data["user"];
      if(this.article.author.username===this.user.username){
        this.canModify=true;

      }else{
        this.canModify=false;
      }
     })
  }
  deleteComment(id){
    this.commentService.deleteComment(this.slug,id).subscribe(
      data=>{
        console.log(data);
        console.log(this.slug);
        location.reload();
        
      }
    )
   
  }

}
