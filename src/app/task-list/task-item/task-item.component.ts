import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/shared/task.model';
import { TaskService } from 'src/app/shared/task.service';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input('task')
  task: Task = {
    name: '',
    done: false
  }
  @Input('index') index: number = 0;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  onDelete(){
    this.taskService.deleteTask(this.index);
  }

  onDone(){
    this.taskService.updateTask(this.index);
  }

}
