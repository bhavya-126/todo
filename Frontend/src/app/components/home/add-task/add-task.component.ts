import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
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
  constructor() {
    this.httpService.tasks.subscribe({
      next: (res) => {
        this.tasks = res
      }
    })
  }
  formBuilder: FormBuilder = new FormBuilder();
  httpService: HttpService = inject(HttpService)
  router: Router = inject(Router)
  activeRoute: ActivatedRoute = inject(ActivatedRoute)

  tasks: Tasks[] = [];

  taskForm = this.formBuilder.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    isActive: [true, [Validators.required]]
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
    // this.httpService.tasks.subscribe({
    //   next: (res) => {
    //     this.tasks = res
    //   }
    // })
    // console.log(this.tasks);



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

    let data = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      isActive: String(this.taskForm.value.isActive) === 'true' ? true : false
    }

    console.log("form data", data);

    if (this.httpService.updateFlag) {

      this.httpService.updateTask(data, this.id).subscribe({
        next: (res: ErrorRes) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: res.message,
            showConfirmButton: false,
            timer: 1500
          });
          let index = this.tasks.findIndex(task => task.taskId === this.id)
          this.tasks[index].isActive = data.isActive
          this.tasks[index].title = data.title
          this.tasks[index].description = data.description

          this.httpService.tasks.next(this.tasks)

          this.taskForm.reset()
          this.httpService.updateFlag = false

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

    this.httpService.updateFlag = false
    this.httpService.addTask(data).subscribe({
      next: (res: { message: string, taskId: number, task: Tasks }) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        // console.log("task added", res.task);

        this.tasks.push(res.task);
        this.httpService.tasks.next(this.tasks)

        this.taskForm.reset()
        this.router.navigate(['/home']);

      },
      error: (err: { error: { message } }) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        });
      }
    }
    )
  }
}
