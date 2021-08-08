import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GustoMusicalComponent } from './components/gusto-musical/gusto-musical.component';
import { LoginComponent } from './components/usuario/login.component';
import { Form2Component } from './components/gusto-musical/form2.component';
import { TipoMusicaComponent } from './components/tipo-musica/tipo-musica.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/gustos', pathMatch: 'full' },
  {path: 'gustos',component:GustoMusicalComponent},
  {path:'gustos/page/:page', component: GustoMusicalComponent},
  {path: 'login',component: UsuarioComponent},
  {path: 'gustos/form',component:Form2Component},
  {path:'gustos/form/:id',component:Form2Component},
  {path: 'tipos',component:TipoMusicaComponent},
  {path: 'tipos/page/:page',component:TipoMusicaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
