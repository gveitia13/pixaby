import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ImagenService} from "../../service/imagen.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnDestroy, OnInit {
  texto = ''
  mostrar = false
  suscripcion: Subscription

  constructor(private _imagenService: ImagenService) {
    this.suscripcion = this._imagenService.getError().subscribe(data => {
      this.texto = data
      this.mostrarMensaje()
    })
  }

  mostrarMensaje() {
    this.mostrar = true
    setTimeout(() => {
      this.mostrar = false
    }, 2000)
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
  }
}
