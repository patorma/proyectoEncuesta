import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { GustoMusicalComponent } from './components/gusto-musical/gusto-musical.component';
import { TipoMusicaComponent } from './components/tipo-musica/tipo-musica.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/usuario/login.component';

import { PaginatorComponent } from './components/paginator/paginator.component';
import { Paginator2Component } from './components/paginator2/paginator2.component';
import { Form1Component } from './components/tipo-musica/form1.component';
import { Form2Component } from './components/gusto-musical/form2.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    GustoMusicalComponent,
    TipoMusicaComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    Form1Component,
    Form2Component,
    
    PaginatorComponent,
    Paginator2Component
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,   
  ],
  providers: [{provide: LocationStrategy,useClass: HashLocationStrategy}, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService , multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
