import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { of, map, Subject, take, exhaustMap } from 'rxjs';
import { SignUpService } from '../sign-up/sign-up.service';
import { Task } from './task.model';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class TaskService implements OnInit {
  constructor(private http: HttpClient, private signupService: SignUpService) {}
  user = null;
  userToken = '';
  userId = '';
  isLoading = new Subject<boolean>();
  ngOnInit(): void {}

  tasks: Task[] = [
    // { name: 'Task 1', done: true },
    // { name: 'Task 2', done: false },
    // { name: 'Task 3', done: false },
  ];

  tasksObservable = of(this.tasks);

  getTasks() {
    return this.tasks.slice();
  }

  addTask(newTask: Task) {
    this.tasks.push(newTask);
    this.sendData();
  }

  deleteTask(index: number) {
    console.log('called');
    this.tasks.splice(index, 1);
    this.sendData();
  }

  updateTask(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
    this.sendData();
  }

  sendData() {
    this.isLoading.next(true);
    let userToken = '';
    let userId = '';
    this.signupService.user.subscribe((data) => {
      if (data.token == null) {
        userToken = this.userToken;
        userId = this.userId;
      } else {
        userToken = data.token;
        userId = data.id;
      }
    });
    console.log(userToken);
    this.http
      .put<Task[]>(
        'https://todo-960b3-default-rtdb.firebaseio.com/' +
          userId +
          'posts.json',
        [...this.tasks],
        {
          params: new HttpParams().set('auth', userToken),
        }
      )
      .subscribe(
        (data) => {},
        (error) => {
          alert(error.error.error);
          this.isLoading.next(false);
        },
        () => {
          this.isLoading.next(false);
        }
      );
  }

  getData() {
    this.isLoading.next(true);
    let userToken = '';
    let userId = '';
    this.signupService.user.subscribe((data) => {
      if (data.token == null) {
        userToken = '';
        userToken = this.userToken;
        userId = this.userId;
        console.log(userToken);
      } else {
        userToken = data.token;
        userId = data.id;
      }
    });
    this.tasks.splice(0, this.tasks.length);
    this.http
      .get<Task[]>(
        'https://todo-960b3-default-rtdb.firebaseio.com/' +
          userId +
          'posts.json',
        {
          params: new HttpParams().set('auth', userToken),
        }
      )
      .subscribe(
        (data: Task[]) => {
          if (data) {
            for (let dataEl of data) {
              this.tasks.push(dataEl);
            }
          }
        },
        (error) => {
          alert(error.error.error);
          this.isLoading.next(false);
        },
        () => {
          this.isLoading.next(false);
        }
      );
  }
}
