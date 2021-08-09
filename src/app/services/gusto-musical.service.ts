import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Tipo } from '../components/tipo-musica/tipo';

@Injectable({
  providedIn: 'root'
})
export class GustoMusicalService {
  private urlEndPoint: string = 'http://localhost:8080/api/tipos';

  constructor(  private http: HttpClient,
    private router: Router) { }

  // getTipo():Observable<Tipo[]>{
  //   return this.http.get<Tipo[]>(`${this.urlEndPoint}/tipos`).pipe(
  //     catchError(e =>{
  //       return throwError(e)
  //     })
  //   )
  // }
  getGustoMusicales(page: number): Observable<any>{
    return this.http.get(`${this.urlEndPoint}/page/${page}`).pipe(
      map((response: any) =>{
        (response.content as Tipo[]).map((gusto)=>{
          gusto.nombre = gusto.nombre.toUpperCase();
          gusto.email = gusto.email.toUpperCase();
          return gusto
        });
        return response
      })
    )
  }

  create(gusto: Tipo): Observable<Tipo>{
    return this.http
      .post(this.urlEndPoint,gusto)
      .pipe(
        map((response: any) => response.gusto as Tipo),
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

  getGusto(id:number): Observable<Tipo>{
    return this.http
      .get<Tipo>(`${this.urlEndPoint}/${id}`)
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

  update(gusto: Tipo): Observable<any>{
    return this.http
    .put<any>(`${this.urlEndPoint}/${gusto.id}`,gusto)
    .pipe(
      catchError((e)=>{
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

  delete(id:number): Observable<Tipo>{
    return this.http
      .delete<Tipo>(`${this.urlEndPoint}/${id}`)
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
