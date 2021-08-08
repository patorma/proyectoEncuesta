import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Gusto } from '../components/gusto-musical/gusto';

@Injectable({
  providedIn: 'root'
})
export class GustoMusicalService {
  private urlEndPoint: string = 'http://localhost:8080/api/gustos';

  constructor(  private http: HttpClient,
    private router: Router) { }

  getGustoMusicales(page: number): Observable<any>{
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map((response: any) =>{
        (response.content as Gusto[]).map((gusto)=>{
          gusto.usuario.nombre = gusto.usuario.nombre.toUpperCase();
          gusto.tipoMusica.nombre =gusto.tipoMusica.nombre.toUpperCase()
          return gusto
        });
        return response
      })
    )
  }

  create(gusto: Gusto): Observable<Gusto>{
    return this.http
      .post(this.urlEndPoint,gusto)
      .pipe(
        map((response: any) => response.gusto as Gusto),
        catchError((e)=>{
           // el estado 400 viene de la validacion, un bad request
           if (e.status === 400) {
            return throwError(e);
          }
          if(e.error.mensaje){
            console.error(e.error.mensaje);
          }
          return throwError(e);
        })
      )
  }

  getGusto(id:number): Observable<Gusto>{
    return this.http
      .get<Gusto>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e)=>{
          if(e.status != 401 && e.error.mensaje){
            /*capturamos el error y redirigimos a gastos*/
            this.router.navigate(['/gustos']);
            console.error(e.error.mensaje);
          }
           
            // swal.fire('Error al editar', e.error.mensaje, 'error');
            return throwError(e);
        })
      )
  }

  delete(id:number): Observable<Gusto>{
    return this.http
      .delete<Gusto>(`${this.urlEndPoint}/${id}`)
      .pipe(
        catchError((e)=>{
          if(e.error.mensaje){
            console.error(e.error.mensaje);
            }
            return throwError(e);
        })
      )
  }
}
