import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarnotificacion',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './listarnotificacion.html',
  styleUrl: './listarnotificacion.css'
})
export class Listarnotificacion implements OnInit {

  notificaciones: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

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

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta notificación?')) {
      let eliminadas = JSON.parse(localStorage.getItem('notisEliminadas') || '[]');
      eliminadas.push(id);
      localStorage.setItem('notisEliminadas', JSON.stringify(eliminadas));
      this.obtenerNotificaciones();
    }
  }

  irAEditar(id: number): void {
    this.router.navigate(['/notificaciones/actualizar', id]);
  }
}
