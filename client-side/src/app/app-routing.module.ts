import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyRecipiesComponent } from './my-recipies/my-recipies.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RecipiesComponent } from './recipies/recipies.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { AuthGuard } from './auth.guard';
import { ReadMoreComponent } from './my-recipies/read-more/read-more.component';
import { AddRecipieComponent } from './my-recipies/add-recipie/add-recipie.component';
import { EditRecipieComponent } from './my-recipies/edit-recipie/edit-recipie.component';
const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},                
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'myRecipies',component:MyRecipiesComponent,canActivate:[AuthGuard]},
  {path:'shoppingList',component:ShoppingListComponent,canActivate:[AuthGuard]},
  {path:'add',component:AddRecipieComponent,canActivate:[AuthGuard]},
  {path:'recipie/:id',component:ReadMoreComponent,pathMatch:"full",canActivate:[AuthGuard]},
  {path:'edit/:id',component:EditRecipieComponent,pathMatch:"full",canActivate:[AuthGuard]},
];            

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
