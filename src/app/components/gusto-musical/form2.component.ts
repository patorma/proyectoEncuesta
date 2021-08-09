import { GustoMusicalService } from './../../services/gusto-musical.service';
import { Component, OnInit } from '@angular/core';

import { Tipo } from '../tipo-musica/tipo';

import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form2.component.html',
  styles: [
  ]
})
export class Form2Component implements OnInit {

   public gusto: Tipo = new Tipo();
  public titulo: string = "Ingrese su gusto musical";
  public errores: string[] =[];
  // tipos!: Tipo[];
  // usuarios!: Usuario[];
  

  constructor(public authService: AuthService,private gustoService: GustoMusicalService,private router: Router,
    private activatedRoute: ActivatedRoute) {
    
     }

  ngOnInit(): void {
    this.cargarGustos();
    
  }

  cargarGustos(): void{
    this.activatedRoute.params.subscribe((params)=>{
      let id =params['id'];
      if(id){
        this.gustoService
          .getGusto(id)
          .subscribe((gusto)=>(this.gusto = gusto))
        
      }
    });
    

      
  }

  public create():void{
    this.gustoService.create(this.gusto).subscribe(
      (gusto) =>{
        this.router.navigate(['/gustos']);
        swal.fire(
          'Nuevo Gusto Musical',
          `El gusto musical ${this.gusto.nombre} y su 
          email ${this.gusto.email} han sido creado con éxito!`,
          'success'
        );
      },
      (err)=>{
        this.errores = err.error.errors as string[]
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
        swal.fire(
          'Error',
          `Ha ocurrido un error al ingresar los datos`,
          'error'
        )
      }
    )
  }

  update(): void{
    console.log(this.gusto)
    this.gustoService.update(this.gusto).subscribe(
      (response)=>{
        this.router.navigate(['/gustos']);
        swal.fire(
          'Gusto Musical del usuario Actualizado',
          `${response.mensaje}: ${this.gusto.nombre}`,
          'success'
        );
      },
      (err)=>{
        this.errores = err.error.errors as string[];
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    )
  }
    // el primer objeto corresponde a cada una de los tipos del ng
  // el segundo objeto es el objeto asignado al gusto y ahi hay que comparar
  // compararTipo(o1: Tipo, o2:Tipo): boolean{
  //    // se compara el objeto 1 y el objeto 2
  //   // si es undefined se deja marcado el seleccionar con un mensaje
  //   if (o1  ===  undefined &&  o2  ===  undefined ){
  //     return true;
  //   }
  //   return o1 === null || o2 === null || o1 === undefined || o2 === undefined
  //   ? false
  //   : o1.id === o2.id;
  // }
}
