import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { url } from '../url';
import { Login } from '../interface/login';
import { Signupdata } from '../interface/signupdata';
import { TaskData } from '../interface/taskData';
import { BehaviorSubject } from 'rxjs';
import { getTasksRes } from '../interface/getTaskRes';

@Injectable({
  providedIn: 'root',
})
export class HttpService implements OnInit {

  constructor() { }
  http: HttpClient = inject(HttpClient);

  tasks = new BehaviorSubject([])

  ngOnInit() {
    this.getTasks().subscribe({
      next: (res: getTasksRes) => {
        this.tasks.next(res.tasks)
      }
    })
    // this.tasks.subscribe((data) => {

    //   console.log("tasks:", data);

    // })
  }

  onChanges() {
    this.getTasks().subscribe({
      next: (res: getTasksRes) => {
        this.tasks.next(res.tasks)
      }
    })
    this.tasks.subscribe((data) => {

      console.log("tasks:", data);

    })
  }

  login(data: Login) {
    return this.http.post(url.BASE_URL + url.LOGIN, data);
  }

  signup(data: Signupdata) {
    return this.http.post(url.BASE_URL + url.SIGNUP, data);
  }

  getTasks() {
    return this.http.get(url.BASE_URL + url.TASKS, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  addTask(data: any) {
    return this.http.post(url.BASE_URL + url.TASKS, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } });
  }

  updateTask(data, id: number) {
    return this.http.put(url.BASE_URL + url.TASKS + `/${id}`, data, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  }

  deleteTask(id: number) {
    return this.http.delete(url.BASE_URL + url.TASKS + `/${id}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
  }
}
