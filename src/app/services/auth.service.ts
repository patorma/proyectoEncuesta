import { Injectable } from '@angular/core';
import { Usuario } from '../components/usuario/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario! : Usuario;
  private _token!: string;
  private _refresh_token!: string ;

  constructor(private http: HttpClient) { }

  public get usuario(): Usuario{
    if(this._usuario  != null){
      return this._usuario;
    } else if ( this._usuario  === null && sessionStorage.getItem('usuario') != null){
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')!) as Usuario;
      return this._usuario;
    }
     // se retorna una instancia den Usuario pero vacia sin datos
    return new Usuario();

  }
  public get refreshToken(): string{
    if(this._refresh_token!= null){
      return this._refresh_token;
    } else if ( this._refresh_token  === null && sessionStorage.getItem('refresh_token') != null){
      this._refresh_token = sessionStorage.getItem('refresh_token')!;
      return this._refresh_token;
    }
    return null!;
  }
  public get token(): string{
    if(this._token  != null){
      return this._token;
    } else if ( this._token  === null && sessionStorage.getItem('token') != null){
      this._token= sessionStorage.getItem('token')|| '{}';
      return this._token;
    }
    return null!;
  }

  login(usuario: Usuario):Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';

    // credenciales del cliente angular, hay que encriptarlas
    //en js se hace con btoa()
    const credenciales = btoa('angularapp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Authorization': 'Basic ' + credenciales});
    let params = new URLSearchParams();
    //params lo que hace es detras de escena es generar los parametros
    //en una URLencoded toma cadaparametro y lo va anexar a la ruta url
    //ejemplo: grant_type=password&username=patricio&password=12345
    //se agrega .toString() para pasarlo a  string
    params.set('grant_type','password');
    params.set('username', usuario.username);
    params.set('password', usuario.password);

   // console.log(params.toString());

     return this.http.post<any>(urlEndPoint,params.toString(),{headers: httpHeaders});
  }

  actualizarToken(refreshToken: string): Observable<any> {
    const urlEndPoint = 'http://localhost:8080/oauth/token';
 
    const credentials = btoa('angularapp' + ':' + '12345');
 
    const httpHeaders = new HttpHeaders(
      {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`
      })
 
    let params = new URLSearchParams();
    params.set('grant_type', 'refresh_token');
    params.set('refresh_token', refreshToken);
    return this.http.post<any>(urlEndPoint, params.toString(), { headers: httpHeaders })
  }
  guardarUsuario(accessToken: string): void{
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    //ahora guardamos en sessionstore
    //JSON.stringify() convierte un objeto en un string
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario))
    
  }

  guardarToken(accessToken: string): void{
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  guardarRefreshToken(refreshToken: string): void{
    this._refresh_token = refreshToken;
    sessionStorage.setItem('refresh_token', refreshToken);
  }
  
  obtenerDatosToken(accessToken: string): any{
     if(accessToken != null){
      return JSON.parse(atob(accessToken.split(".")[1]));
     }
     return null;
  }
  isAuthenticated(): boolean {
    // obtenemos el metodo token desde el getter
     // esta autenticado
    let payload = this.obtenerDatosToken(this.token);
    if(payload != null && payload.user_name && payload.user_name.length > 0 ){
      return true;
    }
    return false;
  }

  hasRole(role: string): boolean{
    if(this.usuario.roles.includes(role)){
      return true;
    }
    return false;

  }

  logout(): void{
    this._token = null!;
    this._usuario = null!;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

}
