import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './notificacion.html',
  styleUrls: ['./notificacion.css']
})
export class NotificacionComponent implements OnInit {
  mostrarFormulario = false;

  nueva = {
    mensaje: '',
    tipo: '',
    fechaEnvio: '',
    usuarioId: ''
  };

  notificaciones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerNotificaciones();
  }

  obtenerNotificaciones(): void {
    this.http.get<any[]>('http://localhost:8080/notificaciones/listar').subscribe({
      next: data => this.notificaciones = data,
      error: err => console.error('Error al cargar notificaciones', err)
    });
  }

  registrar(): void {
    if (!this.nueva.mensaje || !this.nueva.tipo || !this.nueva.fechaEnvio || !this.nueva.usuarioId) {
      alert('Completa todos los campos');
      return;
    }

    const nuevaNoti = {
      mensaje: this.nueva.mensaje,
      tipo: this.nueva.tipo,
      fechaEnvio: this.nueva.fechaEnvio,
      usuario: { id_Usuario: this.nueva.usuarioId }
    };

    this.http.post('http://localhost:8080/notificaciones/registrar', nuevaNoti).subscribe({
      next: () => {
        alert('✅ Notificación registrada');
        this.obtenerNotificaciones();
        this.nueva = { mensaje: '', tipo: '', fechaEnvio: '', usuarioId: '' };
      },
      error: err => {
        alert('❌ Error al registrar notificación');
        console.error(err);
      }
    });
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta notificación?')) {
      this.http.delete(`http://localhost:8080/notificaciones/eliminar/${id}`).subscribe({
        next: () => {
          alert('🗑️ Notificación eliminada');
          this.obtenerNotificaciones();
        },
        error: err => {
          alert('❌ Error al eliminar notificación');
          console.error(err);
        }
      });
    }
  }
}
