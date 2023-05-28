import {Component} from '@angular/core';
import {ImagenService} from "../../service/imagen.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-listar-imagen',
  templateUrl: './listar-imagen.component.html',
  styleUrls: ['./listar-imagen.component.css']
})
export class ListarImagenComponent {
  termino = ''
  subscription: Subscription
  listImagenes: any[] = []
  loading = false
  imagenesPorPagina = 20
  paginaActual = 1
  calcularTotalPaginas = 0
  pagesX10: number[] | undefined = []
  checkifAlgo = false


  constructor(private _imagenService: ImagenService) {
    this.subscription = this._imagenService.getTerminoBusqueda().subscribe(data => {
      this.termino = data
      this.loading = true
      this.paginaActual = 1
      this.obtenerImagenes()
    })
  }

  arrayFromTotalPaginas() {
    let array: number[] = []
    for (let i = 1; i <= this.calcularTotalPaginas; i++) {
      array.push(i)
    }
    return array
  }

  getPagesX10(): number[] | undefined {
    let pages10: number[] | undefined = []
    for (let i of this.getPages10in10().keys()) {
      if (this.paginaActual <= i && this.getPages10in10().has(i)) {
        pages10 = this.getPages10in10().get(i)
        break
      }
    }
    return pages10
  }

  getPages10in10() {
    let mapa: Map<number, number[]> = new Map<number, number[]>()
    let cont = 0,
      key = 10,
      arr: number[] = [],
      aux = this.calcularTotalPaginas,
      stop = 10

    for (let i = 1; i <= this.calcularTotalPaginas; i++) {
      cont++
      arr.push(i)
      if (aux < 10)
        stop = aux
      if (cont === stop) {
        mapa.set(key, arr)
        key += 10
        arr = []
        cont = 0
        aux -= 10
      }
    }
    return mapa
  }

  obtenerImagenes() {
    this._imagenService.getImagenes(this.termino, this.imagenesPorPagina, this.paginaActual)
      .subscribe(data => {
        this.loading = false
        this.pagesX10 = []
        // this.checkifAlgo = false
        if (data.hits.length === 0) {
          this._imagenService.setError('Opss.. no encontramos ningún resultado')
          return
        }
        this.calcularTotalPaginas = Math.ceil(data.totalHits / this.imagenesPorPagina)

        this.listImagenes = data.hits

        this.pagesX10 = this.getPagesX10()
        // this.chechIfAlgo()
      }, (error) => {
        this.loading = false
        this._imagenService.setError('Opss.. ocurrió un error en el servidor')
      })
  }

  paginaPosterior() {
    this.paginaActual++
    this.loading = true
    this.listImagenes = []
    this.obtenerImagenes()
  }

  pagimaAnterior() {
    this.paginaActual--
    this.loading = true
    this.listImagenes = []
    this.obtenerImagenes()
  }

  pagimaAnteriorClass() {
    return this.paginaActual !== 1
  }

  paginaPosteriorClass() {
    return this.paginaActual !== this.calcularTotalPaginas
  }

  paginaSeleccionada(numPgae: number) {
    this.paginaActual = numPgae
    this.loading = true
    this.listImagenes = []
    this.obtenerImagenes()
  }

  chechIfAlgo(): void {

    let asd = Array.from(this.getPages10in10().keys()),
      cont = 0,
      arr = []
    if (asd.length == 1) {
      this.checkifAlgo = false
      return
    }
    for (let i = asd.length - 1; i > 0; i--) {
      cont++
      arr.push(asd[i])
      if (cont === 2)
        break
    }
    let aasd = this.getPages10in10().get(asd.length*10)?.includes(this.paginaActual)
    console.log(aasd)
    this.checkifAlgo = !(this.paginaActual < arr[0] && this.paginaActual > arr[1]);
  }

  protected readonly Array = Array;
}
