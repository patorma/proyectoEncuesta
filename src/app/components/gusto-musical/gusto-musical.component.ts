import { GustoMusicalService } from './../../services/gusto-musical.service';
import { Component, OnInit } from '@angular/core';
import { Gusto } from './gusto';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-gusto-musical',
  templateUrl: './gusto-musical.component.html',
  styleUrls: ['./gusto-musical.component.css']
})
export class GustoMusicalComponent implements OnInit {
  gustos!: Gusto[];
  paginador: any;
  gustoSeleccionado!: Gusto;

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
            this.gustos = response.content as Gusto[]
            this.paginador = response;
          })
    })
  }

  public delete(gusto: Gusto):void{
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
        text: `¿Seguro que desea eliminar el gusto con el mail ${gusto.email} asociado al usuario ${gusto.usuario.nombre}?`,
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
              'Gusto eliminado!',
              ` eliminado con éxito.`,
              'success'
            );
           
            
          });
        }
      })
  }

}


