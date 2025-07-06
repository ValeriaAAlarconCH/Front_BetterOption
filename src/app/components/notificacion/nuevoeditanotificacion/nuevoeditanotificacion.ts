import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nuevoeditanotificacion',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './nuevoeditanotificacion.html',
  styleUrls: ['./nuevoeditanotificacion.css']
})
export class Nuevoeditanotificacion implements OnInit {

  @ViewChild('formulario') formulario!: ElementRef;  // Referencia al formulario

  mostrarFormulario = false;

  nueva = {
    mensaje: '',
    tipo: '',
    fechaEnvio: '',
    usuarioId: ''
  };

  notificaciones: any[] = [];
  idsEliminados: number[] = [];
  editandoId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerNotificaciones();
  }

  obtenerNotificaciones(): void {
    this.http.get<any[]>('http://localhost:8080/notificaciones/listar').subscribe({
      next: data => {
        const eliminadas = JSON.parse(localStorage.getItem('notisEliminadas') || '[]');
        this.notificaciones = data.map(noti => ({
          ...noti,
          oculto: eliminadas.includes(noti.id_notificacion)
        }));
      },
      error: err => console.error('Error al cargar notificaciones', err)
    });
  }

  registrar(): void {
    if (!this.nueva.mensaje || !this.nueva.tipo || !this.nueva.fechaEnvio || !this.nueva.usuarioId) {
      alert('Completa todos los campos');
      return;
    }

    const noti = {
      id_notificacion: this.editandoId,
      mensaje: this.nueva.mensaje,
      tipo: this.nueva.tipo,
      fechaEnvio: this.nueva.fechaEnvio,
      leido: false,
      usuariodto: { id_usuario: this.nueva.usuarioId }
    };

    if (this.editandoId) {
      // ACTUALIZAR
      this.http.put('http://localhost:8080/notificaciones/actualizar', noti).subscribe({
        next: () => {
          alert('✅ Notificación actualizada');
          this.limpiarFormulario();
          this.obtenerNotificaciones();
        },
        error: err => {
          alert('❌ Error al actualizar');
          console.error(err);
        }
      });
    } else {
      // REGISTRAR
      this.http.post('http://localhost:8080/notificaciones/registrar', noti).subscribe({
        next: () => {
          alert('✅ Notificación registrada');
          this.limpiarFormulario();
          this.obtenerNotificaciones();
        },
        error: err => {
          alert('❌ Error al registrar');
          console.error(err);
        }
      });
    }
  }

  eliminar(id: number): void {
    if (!id) {
      alert('❗ ID no válido');
      return;
    }

    if (confirm('¿Estás seguro de eliminar esta notificación?')) {
      let eliminadas = JSON.parse(localStorage.getItem('notisEliminadas') || '[]');
      eliminadas.push(id);
      localStorage.setItem('notisEliminadas', JSON.stringify(eliminadas));

      this.notificaciones = this.notificaciones.map(noti =>
        noti.id_notificacion === id ? { ...noti, oculto: true } : noti
      );
    }
  }

  prepararEdicion(noti: any): void {
    this.nueva = {
      mensaje: noti.mensaje,
      tipo: noti.tipo,
      fechaEnvio: noti.fechaEnvio,
      usuarioId: noti.usuariodto?.id_usuario || ''
    };
    this.editandoId = noti.id_notificacion;
    this.mostrarFormulario = true;

    setTimeout(() => {
      this.formulario.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  limpiarFormulario(): void {
    this.nueva = { mensaje: '', tipo: '', fechaEnvio: '', usuarioId: '' };
    this.mostrarFormulario = false;
    this.editandoId = null;
  }
}
