import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Recipies } from './recipies.model';

@Injectable({
  providedIn: 'root'
})
export class RecipiesService {
 
edit= new Recipies(null,null,null,null,null,null,null,null,null,null,null,null);
  constructor(private http: HttpClient,
    private _router: Router) { }
  getRecipies()
  {
    return this.http.get("http://localhost:3000/myRecipies/");
  }
  getRecipie(id)                  
  {
    return this.http.get("http://localhost:3000/myRecipies/"+id);
  }
  editRecipie(id,edited)                  
  {
    return this.http.post("http://localhost:3000/myRecipies/edit/"+id ,edited);
  }
  addRecipies(item)
  {
    console.log(item); 
    return this.http.post("http://localhost:3000/myRecipies/add",item);
  }   
  deleteRecipie(id)
  {
    console.log("dlt");
    
    return this.http.delete("http://localhost:3000/myRecipies/delete/"+id);
  } 
  getToken() {
    return localStorage.getItem("token");
  }
  test() {
    return this.http.get("http://localhost:3000/test")
  }
}





