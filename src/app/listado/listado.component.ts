import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Estudiante } from './../entidades/estudiante';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.sass']
})
export class ListadoComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  urlBase: String = 'https://frozen-meadow-48728.herokuapp.com/';

  constructor(private http: HttpClient, private router: Router, private _toasService: ToastService) {


    http.get<Estudiante[]>(this.urlBase + 'todos')
      .subscribe(res => {
        this.estudiantes = res.map(est => {
          this.http.get<any>('https://randomuser.me/api/')
            .subscribe(res =>
              est.foto = res['results'][0]['picture']['large']
            )
          return est
        }
        )
        console.log(this.estudiantes)
      })
  }

  ngOnInit(): void {
  }

  eliminarEstudiante(estudiante: Estudiante) {
    this.http.delete(this.urlBase + 'eliminar/' + estudiante.id)
      .subscribe(
        res => {
          this.estudiantes = this.estudiantes.filter(e => e.id !== estudiante.id)
          this._toasService.error("Registro eliminado!")
        }
      )
  }

  editarEstudiante(estudiante: Estudiante) {
    this.router.navigateByUrl('/editar/' + estudiante.id)
  }
}
