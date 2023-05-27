import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";
//Components
import {AppComponent} from './app.component';
import {BuscarImagenComponent} from './components/buscar-imagen/buscar-imagen.component';
import {ListarImagenComponent} from './components/listar-imagen/listar-imagen.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {SpinnerComponent} from './shared/spinner/spinner.component';
import {ErrorComponent} from './shared/error/error.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    BuscarImagenComponent,
    ListarImagenComponent,
    NavbarComponent,
    SpinnerComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
