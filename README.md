# EncuestaFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

##  Intrucciones para obtener datos de la aplicación encuesta
1. Al ingrear http://localhost:4200  se dirigue automaticamente a una vista donde se muestra una tabla con los gustos musicales y los email de usuarios que han ingresado sus gustos musicales.
2. La direccion de la vista indicada anteriormente es:http://localhost:4200/#/gustos
3. Luego en el menu de arriba hacer click  en el boton Sign In para autenticarse
4. Luego de hacer el paso anterior, aparace una vista para ingresar el username y password al sistema para ingresar , ya que si no estamos autenticados  solo vemos la lista del punto 1 sin poder manipularla o ingresar a la encuesta.
5. La direccion del punto 4 es: http://localhost:4200/#/login , para entrar al sistema , el username que se debe ingresar es: admin y clave : 12345 . El username admin nos da los privilegios de manipular esta tabla (editarla o eliminar registros) además de contestar la encuesta
6. El otro username es patricio y clave 1235. La difrencia con el admin es que solo se puede ver la tabla de gustos musicales con email asociados pero tenemos la opcion de contestar la encuesta haciendo click al boton ingresar encuesta
7. Una vez haciendo click en el boton del punto 6 se entra a una vista para ingresar el email y gusto musical
8. La direccion de la vista del punto 7 es : http://localhost:4200/#/gustos/form

## Construido con 🛠️
* [Angular](https://angular.io/) - El framework Javascript para el sitio web
* [Visual Studio](https://visualstudio.microsoft.com/es/) - Editor de código
* [Bootstrap](https://getbootstrap.com/) - Framework de CSS ocupado

