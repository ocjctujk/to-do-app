import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskService } from '../shared/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  constructor(private taskService: TaskService) { }
  name='';

  ngOnInit(): void {
  }
  onSubmit(f: NgForm){
    if(f.valid){
      console.log(f.value.taskname);
      this.taskService.addTask({name: f.value.taskname,done: false});
      this.name='';
    }
    else{
      console.log(f.valid);
    }
  }

}
