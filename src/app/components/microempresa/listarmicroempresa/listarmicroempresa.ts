import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listarmicroempresa',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './listarmicroempresa.html',
  styleUrls: ['./listarmicroempresa.css']
})
export class ListarmicroempresaComponent implements OnInit {
  microempresas: any[] = [];
  indiceSeleccionado: number | null = null;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.cargarMicroempresas();
  }

  cargarMicroempresas() {
    this.http.get<any[]>('http://localhost:8080/microempresas/listar')
      .subscribe({
        next: (data) => {
          this.microempresas = data;
        },
        error: (err) => {
          console.error('Error al obtener microempresas:', err);
          alert('No se pudieron cargar las microempresas desde el backend.');
        }
      });
  }

  seleccionar(index: number) {
    this.indiceSeleccionado = index;
  }

  confirmarSeleccion() {
    if (this.indiceSeleccionado !== null) {
      const seleccionada = this.microempresas[this.indiceSeleccionado];
      alert(`Seleccionaste: ${seleccionada.nombre_negocio}`);
    } else {
      alert('Por favor, selecciona una microempresa primero.');
    }
  }

  verMas() {
    if (this.indiceSeleccionado !== null) {
      const seleccionada = this.microempresas[this.indiceSeleccionado];
      alert(`Detalles:\nNombre: ${seleccionada.nombre_negocio}\nRubro: ${seleccionada.rubro}\nDirección: ${seleccionada.direccion}`);
    } else {
      alert('Selecciona una microempresa para ver más información.');
    }
  }

  eliminar() {
    if (this.indiceSeleccionado !== null) {
      const id = this.microempresas[this.indiceSeleccionado].idMicroempresa;
      this.http.delete(`http://localhost:8080/microempresas/eliminar/${id}`)
        .subscribe({
          next: () => {
            alert('Microempresa eliminada');
            this.cargarMicroempresas(); // recarga la lista
            this.indiceSeleccionado = null;
          },
          error: (err) => {
            console.error('Error al eliminar microempresa:', err);
            alert('No se pudo eliminar la microempresa.');
          }
        });
    } else {
      alert('Selecciona una microempresa para eliminar.');
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
