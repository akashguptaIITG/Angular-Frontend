import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import{FormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { EditorComponent } from './editor/editor.component';
import { LoginComponent } from './login/login.component';
import { ArticlesListComponent } from './articles/articles-list.component';
import { AuthGuard } from './services/auth-guard.service';
import { NoAuthGuard } from './services/noauth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent,
    
    EditorComponent,
    
    LoginComponent,
    
    ArticlesListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      {
        path: 'articles/:slug', component: ArticlesComponent,
        canActivate:[AuthGuard],

      },
      {
        path: 'register', component: RegisterComponent,
        canActivate:[NoAuthGuard],
      },
      {
        path: 'login', component: LoginComponent,
        canActivate:[NoAuthGuard],

      },
      {
        path:'profiles/:username',component:ProfileComponent,
        canActivate:[AuthGuard],
      },
      {
        path:'editor/:slug',component:EditorComponent,
        canActivate:[AuthGuard],
      },
      {
        path:'editor',component:EditorComponent,
        canActivate:[AuthGuard],
      },
      

      { path: '**', redirectTo:'home' },

    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
