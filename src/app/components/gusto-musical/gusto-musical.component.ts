import { GustoMusicalService } from './../../services/gusto-musical.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';
import { Tipo } from '../tipo-musica/tipo';

@Component({
  selector: 'app-gusto-musical',
  templateUrl: './gusto-musical.component.html',
  styleUrls: ['./gusto-musical.component.css']
})
export class GustoMusicalComponent implements OnInit {
  gustos: Tipo[] = [];
  paginador: any;
  gustoSeleccionado!: Tipo;

  constructor(private gustoService: GustoMusicalService,
              private activatedRoute: ActivatedRoute,
              public authService: AuthService,
              private router: Router
    ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) =>{
      let page: number = +params.get('page')!;
      if (!page) {
        page = 0;
      }
      this.gustoService
          .getGustoMusicales(page)
          .subscribe((response) =>{
            this.gustos = response.content as Tipo[]
            this.paginador = response;
          })
    })
  }

  public delete(gusto: Tipo):void{
    const swalWithBootstrapButtons =swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
        
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Está seguro?',
        text: `¿Seguro que desea eliminar el gusto ${gusto.nombre}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {
          this.gustoService.delete(gusto.id).subscribe((response) => {
            this.gustos = this.gustos.filter((ga) => ga !== gusto);
            
            swalWithBootstrapButtons.fire(
              'Tipo de musica eliminado!',
              ` eliminado con éxito.`,
              'success'
            );
           
            
          });
        }
      })
  }

}


