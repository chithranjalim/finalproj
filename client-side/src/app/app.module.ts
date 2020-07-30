import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './auth.service';      
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyRecipiesComponent } from './my-recipies/my-recipies.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { NavComponent } from './nav/nav.component';
import { RecipiesService } from './my-recipies/recipies.service';
import { EditRecipieComponent } from './my-recipies/edit-recipie/edit-recipie.component';
import { ReadMoreComponent } from './my-recipies/read-more/read-more.component';
import { AddRecipieComponent } from './my-recipies/add-recipie/add-recipie.component';
@NgModule({
  declarations: [
    AppComponent,
    MyRecipiesComponent,
    SignupComponent,
    LoginComponent,
    ShoppingListComponent,
    NavComponent,     
    EditRecipieComponent,
    ReadMoreComponent, 
    AddRecipieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ],
  providers: [AuthService,AuthGuard,RecipiesService,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
              }],  
  bootstrap: [AppComponent]
})
export class AppModule { }
