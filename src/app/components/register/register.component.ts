import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  userform: Usuario = new Usuario();
  constructor(
    private usuarioService:UsuarioService,
    // private _toastr:ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

  }
  crearUsuario(){
    this.usuarioService.addUsuario(this.userform).subscribe(
      (result) => {
        console.log(result)
        this.router.navigate(['login']);
        // this._toastr.success("Usuario creado","Exito")
        // this.router.navigate(['login']);
      },
      (error) =>{
        // this._toastr.error(error, "Error")
      }
    )
  }
}
