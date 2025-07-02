import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// make an interface for task model
export interface Task {
  id: number; // unique id for each task
  title: string; // task name
  completed: boolean; // we'll use this to mark checkboxes
}

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})

export class TaskList {
  // hard-coded task list
  tasks: Task[] = [
    {id: 1, title: "Get groceries", completed: false},
    { id: 2, title: "Go to the gym", completed: false },
    { id: 3, title: "Cook dinner", completed: false },
    {id: 4, title: "Read a bit before bed", completed: false},
    { id: 5, title: "Plan out next day", completed: false },
  ];

  // filter to get all, active, and completed tasks
  filter: 'all' | 'active' | 'completed' = 'all';

  // new task to add
  newTask: Task = {id: 0, title: '', completed: false};
  // condition to show add new task row
  showAddTask: boolean = false;

  handleAddTask() {
    this.showAddTask = true;
  }

  addTask(task: Task): void {
    if (task.title.trim() !== '') {
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: task.title.trim(),
        completed: false
      };
      
      // push newly added tasks to end of list
      // this.tasks.push(newTask);

      // push newly added tasks to top of list
      this.tasks.unshift(newTask);
      this.newTask.title = '';
    }
    this.showAddTask = false;
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  cancelAddTask(): void {
    this.newTask.title = '';
    this.showAddTask = false;
  }

  toggleComplete(id: number): void {
    this.tasks = this.tasks.map(t => t.id === id ? {...t, completed: !t.completed}: t);
  }

  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }

  filteredTasks(): Task[] {
    // if user clicks active filter
    if (this.filter === 'active') return this.tasks.filter(t => !t.completed);
    // if user clicks completed filter
    if (this.filter === 'completed') return this.tasks.filter(t => t.completed);
    return this.tasks; //else return all tasks
  }
}
