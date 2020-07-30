import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShoppingService } from './shopping.service';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
title:String="Shopping list";
  constructor(private _auth:AuthService,
              private shoppingService:ShoppingService) { }

  ngOnInit(): void {
  }
       public items = [];
       public newTask;
       
       public addToList() { 
           if (this.newTask == '') { 
           } 
           else { 
               this.items.push(this.newTask);
               this.shoppingService.save()
      .subscribe(             
        res => {
          console.log(res);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._auth.logoutUser();
            }
          }
        }
      );
    } 
    this.newTask = ''; 
           } 
    public deleteTask(index) { 
    this.items.splice(index, 1); 
       } 
}

