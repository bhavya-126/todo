import { Component, inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formBuilder: FormBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(8)],
  });
  httpService: HttpService = inject(HttpService);

  onLogIn() {
    this.httpService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
