import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { onErrorResumeNext } from 'rxjs';
import { AlertifyService } from 'src/_services/alertify.service';
import { Routes, Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
model: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
    }, error => {
      this.alertify.error('Login Failed');
    }, () => {
      this.router.navigate(['/members']);
    });
  }
  loggedIn() {
    return this.authService.loggedIn();
  }
  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
