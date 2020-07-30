import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';
import { RecipiesService } from '../recipies.service';
import { AuthService } from '../../auth.service';
import { Recipies } from '../recipies.model';
@Component({
  selector: 'app-read-more',
  templateUrl: './read-more.component.html',
  styleUrls: ['./read-more.component.css']
})
export class ReadMoreComponent implements OnInit {
 
  recipies: Recipies[];
  id:String;
  recipie = new Recipies(null,null,null,null,null,null,null,null,null,null,null,null);
  // Image properties
  imageWidth: number = 100;
  imageMargin: number = 2;
  // Creating service object for calling getProduct()
  constructor(private recipiesService: RecipiesService,
              private _router: Router,
              private actRoute:ActivatedRoute,
              private _auth: AuthService) { }
  
  ngOnInit(): void {
   
    this.recipiesService.test()
    .subscribe(
      res => console.log("success"),
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._auth.logoutUser();
          }
        }
      }
    )
      
    this.actRoute.paramMap
    .subscribe((params) => {
      this.id= params.get('id');
    });

    this.recipiesService.getRecipie(this.id)
    .subscribe((data) => {
      this.recipie = JSON.parse(JSON.stringify(data));
      console.log(this.recipie);
    });
  }
}
