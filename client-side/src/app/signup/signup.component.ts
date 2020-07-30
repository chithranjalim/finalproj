import { Component, OnInit } from '@angular/core';
import { UserModel } from "./user.model";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})                
export class SignupComponent implements OnInit {
title:String ="Sign Up";           

  constructor(private auth: AuthService,
    private router: Router) { }
    signupUserDetails = new UserModel(null, null,null, null,null, null,null);
   
    ngOnInit(): void {
      // this.auth.logoutUser();
    }
                 
    signupUser() {
           // console.log(this.signupUserDetails);
      this.auth.signupUser(this.signupUserDetails)
       .subscribe(
        res => {
          console.log(res)
          localStorage.setItem("token", res["token"]);           
          this.router.navigate(["/myRecipies"]);
        },                
        err => console.log(err)
      );
    }
  }
 