import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public _auth:AuthService) { }

  ngOnInit(): void {
  }
  hasAuth() {
    return this._auth.isLoggedIn();
  }

  logoutUser() {
    this._auth.logoutUser();
    
  }
}
