import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Estudiante } from '../entidades/estudiante';
import { ToastService } from 'angular-toastify';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {

  estudiante: Estudiante = {} as Estudiante;
  titulo: string = 'Registrar';
  urlBase: String = 'https://frozen-meadow-48728.herokuapp.com/';

  constructor(private http: HttpClient, private _toastService: ToastService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.estudiante.id = param['id']
    })

    if (this.estudiante.id) {
      this.titulo = "Editar"
      this.http.get<Estudiante>(this.urlBase + 'uno/' + this.estudiante.id).subscribe(
        res => {
          this.estudiante = res
        }
      )
    }
  }
  guardarEstudiante(): void {
    this.estudiante.id ? this.http.put(this.urlBase + 'actualizar', this.estudiante).subscribe(
      res => {
        console.log(res)
        this._toastService.success("Registro Editado con exito!")
      }
    ) :
      this.http.post<Estudiante>(this.urlBase + 'registrar', this.estudiante)
        .subscribe(res => {
          this._toastService.success("Registro Guardado con exito!")
        })
  }

}
