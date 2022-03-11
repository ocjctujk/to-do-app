import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, of, Subject, tap } from 'rxjs';
import { User } from '../shared/user.model';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class SignUpService {
  logInURL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  signUpURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  API_KEY = 'AIzaSyAkg2g5kv1I1kPtsxujJn5-C2Y3MV9iu8k';
  isLoading = new Subject<boolean>();
  userToken = '';
  user = new BehaviorSubject<User>(new User('', '', '', new Date()));

  constructor(private http: HttpClient, private router: Router) {}
  login(auth: { email: string; password: string }) {
    this.isLoading.next(true);
    console.log('Logging In');
    this.http
      .post<AuthResponse>(this.logInURL + this.API_KEY, {
        email: auth.email,
        password: auth.password,
        returnSecureToken: true,
      })
      .pipe(
        tap((respdata) => {
          const expirationDate = new Date(
            new Date().getTime() + +respdata.expiresIn * 1000
          );
          let userIn = new User(
            respdata.email,
            respdata.localId,
            respdata.idToken,
            expirationDate
          );
          this.user.next(userIn);
          localStorage.setItem('userData', JSON.stringify(userIn));
          console.log(userIn);
        })
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          const errorMessage = error.error.error.message;
          console.log(errorMessage);

          alert(errorMessage);
          this.isLoading.next(false);
        },
        () => {
          this.isLoading.next(false);
          this.router.navigate(['/todo']);
          setInterval(() => {
            localStorage.clear();
            this.logOut();
          }, 900000);
        }
      );
  }

  signup(auth: { email: string; password: string }) {
    this.isLoading.next(true);
    console.log('Signing up');
    this.http
      .post<AuthResponse>(this.signUpURL + this.API_KEY, {
        email: auth.email,
        password: auth.password,
        returnSecureToken: true,
      })
      .pipe(
        tap((respdata) => {
          const expirationDate = new Date(
            new Date().getTime() + +respdata.expiresIn * 1000
          );
          let userIn = new User(
            respdata.email,
            respdata.localId,
            respdata.idToken,
            expirationDate
          );
          this.user.next(userIn);
          localStorage.setItem('userData', JSON.stringify(userIn));
          console.log(userIn);
        })
      )
      .subscribe(
        (data) => {
          //   console.log(data);
        },
        (error) => {
          const errorMessage = error.error.error.message;
          console.log(errorMessage);
          alert(errorMessage);
          this.isLoading.next(false);
        },
        () => {
          console.log('Done !!');
          this.isLoading.next(false);
          this.router.navigate(['/todo']);
          setInterval(() => {
            localStorage.clear();
            this.logOut();
          }, 900000);
        }
      );
  }

  logOut() {
    this.user.next(new User('', '', '', new Date()));
    localStorage.clear();
    this.router.navigate(['']);
  }
}
