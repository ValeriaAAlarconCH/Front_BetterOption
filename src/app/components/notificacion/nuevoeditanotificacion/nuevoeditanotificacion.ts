import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-nuevoeditanotificacion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  templateUrl: './nuevoeditanotificacion.html',
  styleUrl: './nuevoeditanotificacion.css'
})
export class Nuevoeditanotificacion implements OnInit {

  formulario: FormGroup;
  id: number = 0;
  edicion: boolean = false;
  listaUsuarios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formulario = this.fb.group({
      mensaje: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaEnvio: ['', Validators.required],
      usuarioId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] && !isNaN(Number(params['id']))) {
        this.id = Number(params['id']);
        this.edicion = true;
        this.obtenerNotificacion();
      } else {
        this.edicion = false;
      }
    });

    this.obtenerUsuarios();
  }

  obtenerUsuarios(): void {
    this.http.get<any[]>('http://localhost:8080/usuarios/listar').subscribe({
      next: data => {
        this.listaUsuarios = data;
      },
      error: err => console.error('Error al cargar usuarios', err)
    });
  }

  obtenerNotificacion(): void {
    this.http.get<any>(`http://localhost:8080/notificaciones/listarid/${this.id}`).subscribe({
      next: noti => {
        this.formulario.patchValue({
          mensaje: noti.mensaje,
          tipo: noti.tipo,
          fechaEnvio: noti.fechaEnvio,
          usuarioId: noti.usuariodto?.id_usuario
        });
      },
      error: err => console.error(err)
    });
  }

  onSubmit(): void {
    if (this.formulario.invalid) {
      alert('Completa todos los campos');
      return;
    }

    const noti = {
      id_notificacion: this.id,
      mensaje: this.formulario.value.mensaje,
      tipo: this.formulario.value.tipo,
      fechaEnvio: this.formulario.value.fechaEnvio,
      leido: false,
      usuariodto: { id_usuario: this.formulario.value.usuarioId }
    };

    const peticion = this.edicion
      ? this.http.put('http://localhost:8080/notificaciones/actualizar', noti)
      : this.http.post('http://localhost:8080/notificaciones/registrar', noti);

    peticion.subscribe({
      next: () => this.router.navigate(['/notificaciones']),
      error: err => console.error(err)
    });
  }
}
