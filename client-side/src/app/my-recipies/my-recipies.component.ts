import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipiesService } from './recipies.service';
import { AuthService } from '../auth.service';
import { Recipies } from './recipies.model';
  
@Component({
  selector: 'app-my-recipies',
  templateUrl: './my-recipies.component.html',
  styleUrls: ['./my-recipies.component.css']
})
export class MyRecipiesComponent implements OnInit {
title:String="MY RECIPIES";
  recipies: Recipies[];
  recipie: Recipies;
  id:String;
  // Image properties
  imageWidth: number = 100;
  imageMargin: number = 2;
  // Creating service object for calling getProduct()
  constructor(private recipiesService: RecipiesService,
              private _router: Router,
              private _auth: AuthService) { }
  
  ngOnInit(): void {
    this.recipiesService.getRecipies()
    .subscribe(
      data => {
        this.recipies = JSON.parse(JSON.stringify(data));
        console.log(this.recipies)
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
  onDelete(recipie) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.recipiesService.deleteRecipie(recipie._id).subscribe((res) => {
        this._router.navigate(['/myRecipies'])
        console.log(recipie._id);      
        console.log(recipie);
      });
    }}

}
