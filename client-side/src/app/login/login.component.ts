import { Component, OnInit } from '@angular/core';
import { UserModel } from "../signup/user.model";
import { AuthService } from "../auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
title:String= "Login";
  constructor(private auth: AuthService, 
    private router: Router) { }
loginUserDetails = new UserModel(null, null,null, null,null, null,null);
ngOnInit(): void {
this.auth.logoutUser();
}

loginUser() {
this.auth.loginUser(this.loginUserDetails)
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
