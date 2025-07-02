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

  // hard-coded array of tasks
  tasks: Task[] = [
    { id: 1, title: "Get groceries", completed: false },
    { id: 2, title: "Go to the gym", completed: false },
    { id: 3, title: "Cook Dinner", completed: false },
    { id: 4, title: "Read a bit before bed", completed: false },
    { id: 5, title: "Plan out next day", completed: false },
  ]

  // Current filter option for displaying tasks: 'all', 'active', or 'completed'
  filter: 'all' | 'active' | 'completed' = 'all';

  // condition to add new task row
  showAddTask: boolean = false;

  // empty task row for adding new task
  newTask: Task = { id: 0, title: '', completed: false };

  /**
   * Shows the input row to add a new task by setting showAddTask to true
   */
  handleAddTask() {
    // set showAddTask to true so that user can enter a new task
    this.showAddTask = true;
  }

  // Cancels adding a new task
  cancelAddTask() {
    // clear input so that newTask row will be blank
    this.newTask.title = '';
    // set showAddTask to false so that we can see add new task button
    this.showAddTask = false;
  }

  /**
   * Adds a new task
   * @param task is the new task to be added to list
   */
  addTask(task: Task): void {
    // if task title is not empty, add new task to list
    if (task.title.trim() !== '') {
      // make a new task object
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: task.title,
        completed: false // default for newly added task
      };

      // add new task to bottom of list
      // this.tasks.push(newTask);

      // add new task to top of list
      this.tasks.unshift(newTask);
      // clear input so that newTask row will be blank
      this.newTask.title = '';
      // set showAddTask to false so that we can see add new task button
      this.showAddTask = false;
    }
  }

  /**
   * Deletes a task
   * @param id is the id of the task to be deleted
   */
  deleteTask(id: number): void {
    // Remove the task with the given id by filtering it out of the tasks list
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  /**
   * Completes a task (updates completed)
   * @param id is the id of the task to be completed
   */
  toggleComplete(id: number): void {
    // Find the matching id in the tasks list:
    // if the id matches, create a new task object with 'completed' flipped;
    // otherwise, return the task unchanged.
    this.tasks = this.tasks.map(task => task.id == id ? { ...task, completed: !task.completed } : task);
  }

  // Updates the current task filter (all, active, or completed)
  setFilter(filter: 'all' | 'active' | 'completed'): void {
    this.filter = filter;
  }

  /**
   * Returns tasks filtered by the current filter state.
   * If the filter is 'active', returns incomplete tasks.
   * If the filter is 'completed', returns completed tasks.
   * If the filter is 'all', returns all tasks.
   * @returns a filtered list of Task[] objects
  */
  filteredTasks(): Task[] {
    // if 'active' filter is clicked, display all active tasks
    if (this.filter === 'active') return this.tasks.filter(task => !task.completed);
    // if 'completed' filter is clicked, display all completed tasks
    if (this.filter === 'completed') return this.tasks.filter(task => task.completed);
    // otherwise return all tasks
    return this.tasks;
  }
}
