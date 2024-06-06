import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { url } from '../url';
import { Login } from '../interface/login';
import { Signupdata } from '../interface/signupdata';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}
  http: HttpClient = inject(HttpClient);
  login(data: Login) {
    return this.http.post(url.BASE_URL + url.LOGIN, data);
  }

  signup(data: Signupdata) {
    return this.http.post(url.BASE_URL + url.SIGNUP, data);
  }
}
