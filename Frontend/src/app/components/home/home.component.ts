import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorRes } from 'src/app/interface/errRes';
import { getTasksRes } from 'src/app/interface/getTaskRes';
import { Tasks } from 'src/app/interface/tasks';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  httpService: HttpService = inject(HttpService);
  router: Router = inject(Router);

  tasks: Tasks[] = []
  ngOnInit() {
    this.getUsers()

  }

  getUsers() {
    this.httpService.getTasks().subscribe({
      next: (res: getTasksRes) => {
        this.tasks = res.tasks;
        this.httpService.tasks.next(res.tasks)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }



  updateTask(id: number) {
    this.router.navigate(['home', 'addTask'], { queryParams: { id } })
  }

  deleteTask(id: number) {
    this.httpService.deleteTask(id).subscribe({
      next: (res: ErrorRes) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.httpService.tasks.subscribe({
          next: (res) => {
            this.httpService.tasks.next(res.filter((task) => task.id !== id))
          }
        })
        // this.getUsers()

      },
      error: (err: ErrorRes) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message
        });
      }
    })
  }
}
