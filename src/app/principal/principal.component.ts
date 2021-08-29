import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Estudiante } from './../entidades/estudiante';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.sass']
})
export class PrincipalComponent implements OnInit {

  estudiante: Estudiante = {} as Estudiante;
  estudiantes: Estudiante[] = [];

  constructor(private http: HttpClient) {
    http.get<Estudiante[]>('https://frozen-meadow-48728.herokuapp.com/todos')
      .subscribe(res => {
        this.estudiantes = res
        console.log(this.estudiantes)
      })
  }

  ngOnInit(): void {
  }

  guardarEstudiante(): void {
    this.http.post<Estudiante>('https://frozen-meadow-48728.herokuapp.com/registrar', this.estudiante)
      .subscribe(res => {
        this.estudiantes.push(res)
      })
  }

  eliminarEstudiante(estudiante: Estudiante) {
    this.estudiantes = this.estudiantes.filter(e => e.id !== estudiante.id)
  }

}
