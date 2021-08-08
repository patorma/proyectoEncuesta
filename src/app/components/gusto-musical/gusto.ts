import { Tipo } from '../tipo-musica/tipo';
import { Usuario } from '../usuario/usuario';
export class Gusto{
    id!: number;
    usuario!: Usuario;
    tipoMusica!: Tipo;
    email!:string;
}