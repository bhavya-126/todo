import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorRes } from 'src/app/interface/errRes';
import { LoginRes } from 'src/app/interface/login-res';
import { SignupRes } from 'src/app/interface/signup-res';
import { HttpService } from 'src/app/services/http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  httpService: HttpService = inject(HttpService);
  router: Router = inject(Router);

  signupForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required], Validators.minLength(3)],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })


  onSignup() {
    this.httpService.signup(this.signupForm.value).subscribe({
      next: (res: SignupRes) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", this.signupForm.value.email)
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: res.message,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(["/home"]);
      },
      error: (err: { error: { message: string } }) => {
        console.log(err);

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.error.message,
        });
      }
    })

  }
}
