import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-updateusuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './updateusuario.html',
  styleUrl: './updateusuario.css'
})
export class UpdateusuarioComponent implements OnInit {
  private route = inject(ActivatedRoute);
  usuario = {
    id_usuario: 0,
    nombre: '',
    correo: '',
    password: '',
    rol: '',
    fecharegistro: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<any>(`http://localhost:8080/usuarios/listarid/${id}`).subscribe({
      next: (data) => {
        this.usuario = {
          id_usuario: data.id_usuario,
          nombre: data.nombre,
          correo: data.correo,
          password: data.password,
          rol: data.rol,
          fecharegistro: data.fecharegistro
        };
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
        alert('No se pudo cargar el usuario.');
      }
    });
  }

  actualizar(): void {
    const usuarioRequest = {
      id_usuario: this.usuario.id_usuario,
      nombre: this.usuario.nombre,
      correo: this.usuario.correo,
      password: this.usuario.password,
      rol: this.usuario.rol,
      fecharegistro: this.usuario.fecharegistro
    };

    this.http.put<any>('http://localhost:8080/usuarios/actualizar', usuarioRequest).subscribe({
      next: () => {
        alert('Usuario actualizado correctamente.');
        this.router.navigate(['/usuarios']);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('Hubo un error al actualizar el usuario.');
      }
    });
  }

  irAListaUsuarios() {
    this.router.navigate(['/usuarios']);
  }
}
