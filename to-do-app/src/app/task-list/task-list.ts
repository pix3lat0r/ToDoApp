import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Make an interface for task model
export interface Task {
  id: number; // Unique ID for each task
  title: string; // Task name
  completed: boolean; // We'll use this to mark checkboxes
}

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.html',
  styleUrls: ['./task-list.scss']
})

export class TaskList {

  // Hard-coded array of tasks
  tasks: Task[] = [
    { id: 1, title: "Get groceries", completed: false },
    { id: 2, title: "Go to the gym", completed: false },
    { id: 3, title: "Cook Dinner", completed: false },
    { id: 4, title: "Read a bit before bed", completed: false },
    { id: 5, title: "Plan out next day", completed: false },
  ]

  // Current filter option for displaying tasks: 'all', 'active', or 'completed'
  filter: 'all' | 'active' | 'completed' = 'all';

  // Condition to add new task row
  showAddTask: boolean = false;

  // Empty task row for adding new task
  newTask: Task = { id: 0, title: '', completed: false };

  // Empty editing field for editing a task
  editingField: { [id: number]: { [key: string]: boolean } } = {};

  /**
   * Shows the input row to add a new task by setting showAddTask to true
   */
  handleAddTask() {
    // Set showAddTask to true so that user can enter a new task
    this.showAddTask = true;
  }

  // Cancels adding a new task
  cancelAddTask() {
    // Clear input so that newTask row will be blank
    this.newTask.title = '';
    // Set showAddTask to false so that we can see add new task button
    this.showAddTask = false;
  }

  /**
   * Adds a new task
   * @param task is the new task to be added to list
   */
  addTask(task: Task): void {
    // If task title is not empty, add new task to list
    if (task.title.trim() !== '') {
      // Make a new task object
      const newTask: Task = {
        id: this.tasks.length + 1,
        title: task.title,
        completed: false // Default for newly added task
      };

      // Add new task to bottom of list
      // this.tasks.push(newTask);

      // Add new task to top of list
      this.tasks.unshift(newTask);
      // Clear input so that newTask row will be blank
      this.newTask.title = '';
      // Set showAddTask to false so that we can see add new task button
      this.showAddTask = false;
    }
  }

  /**
   * Enables editing mode for a specific task
   * @param id is the ID of the task being edited
   * @param field is a valid key (property name, i.e. "title") of Task
   */
  startEditing(id: number, field: keyof Task) {
    // Mark the field as true (editing)
    this.editingField[id] = { ...this.editingField[id], [field]: true };
  }

  /**
   * 
   * Disables editing mode and updates the edited task in Tasks
   * @param id is the ID of the task being edited
   * @param field is a valid key (property name, i.e. "title") of Task
   * @param task is the task to be updated
   */
  stopEditing(id: number, field: keyof Task, task: Task) {
    // Mark the field as false (stop editing)
    this.editingField[id][field] = false;
    // If task has a valid ID, update task list with new value
    if (task.id) {
      this.tasks = this.tasks.map(t => t.id == id ? { ...t, [field]: task[field] } : t);
    } else {
      console.log('Unable to update: missing row ID');
    }
  }

  /**
   * Deletes a task
   * @param id is the ID of the task to be deleted
   */
  deleteTask(id: number): void {
    // Remove the task with the given ID by filtering it out of the tasks list
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  /**
   * Completes a task (updates completed)
   * @param id is the ID of the task to be completed
   */
  toggleComplete(id: number): void {
    // Find the matching ID in the tasks list:
    // if the ID matches, create a new task object with 'completed' flipped;
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
