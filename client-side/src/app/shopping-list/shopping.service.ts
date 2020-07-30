import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient,
    private _router: Router) { }
  save()
    {
      return this.http.post("http://localhost:3000/shoppinglist",{});
    }
}
