import {Component} from '@angular/core';

@Component({
  selector: 'app-buscar-imagen',
  templateUrl: './buscar-imagen.component.html',
  styleUrls: ['./buscar-imagen.component.css']
})
export class BuscarImagenComponent {
  nombreImagen: string

  constructor() {
    this.nombreImagen = ''
  }

  buscarImagenes() {
    console.log(this.nombreImagen)
  }
}
