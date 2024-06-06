import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorRes } from 'src/app/interface/errRes';
import { getTasksRes } from 'src/app/interface/getTaskRes';
import { TaskData } from 'src/app/interface/taskData';
import { Tasks } from 'src/app/interface/tasks';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

interface param {
  params: {
    id: string
  }
}

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  formBuilder: FormBuilder = new FormBuilder();
  httpService: HttpService = inject(HttpService)
  router: Router = inject(Router)
  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  tasks: Tasks[] = [];

  taskForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    isActive: [true, { notNull: true }, [Validators.required]]
  });
  id: number
  selectedTask: Tasks


  ngOnInit() {
    // this.httpService.getTasks().subscribe({
    //   next: (res: getTasksRes) => {
    //     this.tasks = res.tasks;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
    this.httpService.tasks.subscribe({
      next: (res) => { }
    })

    this.activeRoute.queryParamMap.subscribe((params: any) => {
      this.id = +params.params.id;
      // console.log(this.id);

      if (this.id) {
        this.selectedTask = this.tasks.find(task => task.taskId === this.id);
        this.taskForm.controls.title.setValue(this.selectedTask?.title);
        this.taskForm.controls.description.setValue(this.selectedTask?.description);
        this.taskForm.controls.isActive.setValue(this.selectedTask?.isActive);
      } else {
        this.taskForm.reset();
      }
    })


  }

  addTask() {

    if (this.selectedTask) {
      console.log(this.taskForm.value);

      this.httpService.updateTask(this.taskForm.value, this.id).subscribe({
        next: (res: ErrorRes) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          this.taskForm.reset()
          this.httpService.onChanges()
          this.router.navigate(['/home']);

        },
        error: (err: ErrorRes) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.message
          });
        }
      })

      return
    }


    this.httpService.addTask(this.taskForm.value).subscribe({
      next: (res: { message: string, taskId: number }) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.httpService.tasks.subscribe((tasks) => {
          let newTask = this.taskForm.value;
          newTask['taskId'] = res.taskId;
          newTask['email'] = localStorage.getItem('email')
          this.httpService.tasks.next([...tasks, newTask])
        })
        // this.httpService.onChanges()
        this.taskForm.reset()
        this.router.navigate(['/home']);

      },
      error: (err: ErrorRes) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.message
        });
      }
    }
    )
  }
}
