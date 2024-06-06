import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  router: Router = inject(Router)

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/login']);
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You are not logged in"
      });
    }
  }

}
