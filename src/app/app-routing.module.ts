import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GustoMusicalComponent } from './components/gusto-musical/gusto-musical.component';
import { LoginComponent } from './components/usuario/login.component';
import { Form2Component } from './components/gusto-musical/form2.component';
import { TipoMusicaComponent } from './components/tipo-musica/tipo-musica.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { AuthGuard } from './components/usuario/guards/auth.guard';
import { RoleGuard } from './components/usuario/guards/role.guard';
import { VerificaTokenGuard } from './components/usuario/guards/verifica-token.guard';

const routes: Routes = [
  { path: '', redirectTo: '/gustos', pathMatch: 'full' },
  {path: 'gustos',component:GustoMusicalComponent},
  {path:'gustos/page/:page', component: GustoMusicalComponent},
  {path: 'login',component: UsuarioComponent},
  {path: 'gustos/form',
  component:Form2Component,
  canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
  data: { role: 'ROLE_USER' }
},
  {path:'gustos/form/:id',component:Form2Component,
  canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
  data: { role: 'ROLE_ADMIN' }
},
  {path: 'tipos',
  component:TipoMusicaComponent,
  canActivate: [AuthGuard, RoleGuard,VerificaTokenGuard],
  data: { role: 'ROLE_USER' }
},
  {path: 'tipos/page/:page',component:TipoMusicaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
