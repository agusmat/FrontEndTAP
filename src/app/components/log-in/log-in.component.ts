import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { LoginserviceService } from 'src/app/services/loginservice.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  userform: Usuario = new Usuario();

  constructor(
    private loginService:LoginserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  login()
  {
    console.log(this.userform.email);
    console.log(this.userform.password);
    this.loginService.login(this.userform.email, this.userform.password).subscribe(res => {
      console.log(res);

      sessionStorage.setItem('token', res.token);
      sessionStorage.setItem('userId', res.user_id);
      sessionStorage.setItem('usuarioLogueado', res);

      console.log(sessionStorage.getItem("userId"))

      // var dateM = Date.now();
      // var d = new Date();
      // console.log(dateM)
      // console.log(d)

      this.router.navigate(['home']);
    })
  }

}
