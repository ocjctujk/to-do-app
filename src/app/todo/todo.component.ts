import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/task.service';
import { User } from '../shared/user.model';
import { SignUpService } from '../sign-up/sign-up.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TODOComponent implements OnInit {
  user: string | undefined;
  isLoading = true;

  constructor(
    private taskService: TaskService,
    private signUpService: SignUpService
  ) {}

  ngOnInit(): void {
    this.autoLogin();
    this.taskService.getData();
    this.signUpService.user.subscribe((data) => {
      this.user = data.email;
    });
    this.taskService.isLoading.subscribe(data=>{
      this.isLoading=data;
    })
  }

  sendData() {
    this.taskService.sendData();
  }

  logOut() {
    this.signUpService.logOut();
  }

  autoLogin() {
    let userData;
    if(localStorage.getItem('userData')){
      console.log(localStorage.getItem('userData'));
      userData = JSON.parse(localStorage.getItem('userData') || '');
    }
    console.log(userData);
    if (!userData) {
      return;
    } else {
      this.taskService.userToken = userData._token;
      this.taskService.userId = userData.id;
      this.user = userData.email;
    }
  }
}
