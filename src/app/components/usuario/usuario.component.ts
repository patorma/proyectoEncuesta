import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  titulo:string = 'Por favor Sign In!';
  usuario: Usuario;
  
  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
   }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      // accedemos al metodo getter (usuario)
      swal.fire('Login',`Hola ${this.authService.usuario.username} ya estás autenticado!`,'info');
      this.router.navigate(['/gustos']);
    }
  }
  login(): void{
    //console.log(this.usuario);
    if(this.usuario.username == null || this.usuario.password == null){
      swal.fire('Error Login','Username o password vacías!','error');
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response =>{
        //console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        this.authService.guardarRefreshToken(response.refresh_token);
        let usuario = this.authService.usuario; 
        this.router.navigate(['/gustos'])
        swal.fire('Login', `Hola ${usuario.username}, has iniciado sesión con éxito!`, 'success');
      },err=>{
        if(err.status === 400){
          swal.fire('Error Login', 'Usuario o clave incorrectas!', 'error');
        }
      }
    )
  }
}
