import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, tap } from 'rxjs';
import { User } from '../shared/user.model';
import { SignUpService } from './sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  constructor(private signUpService: SignUpService, private router: Router) {}

  ngOnInit(): void {
    this.autoLogin();
    this.signUpService.isLoading.subscribe((data) => {
      this.isLoading = data;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const auth = {
        email: form.value.email,
        password: form.value.password,
      };
      if (this.isLogin) {
        this.signUpService.login(auth);
      } else {
        this.signUpService.signup(auth);
      }
    } else {
      alert('Invalid format of data');
    }
    form.reset();
  }

  toggle() {
    this.isLogin = !this.isLogin;
  }

  autoLogin() {
    let userData;
    if (localStorage.getItem('userData')) {
      console.log(localStorage.getItem('userData'));
      userData = JSON.parse(localStorage.getItem('userData') || '');
    }
    console.log(userData);
    if (!userData) {
      return;
    } else {
      this.signUpService.user.next(userData);
      this.router.navigate(['/todo']);
    }
  }
}
