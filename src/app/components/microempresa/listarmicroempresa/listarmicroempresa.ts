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
          console.log('⚠️ Datos recibidos del backend:', data);

          const eliminados = JSON.parse(localStorage.getItem('eliminados') || '[]');
          this.microempresas = data.filter(m => !eliminados.includes(m.id_microempresa));
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
      alert(`Seleccionaste: ${seleccionada.nombreNegocio}`);
    } else {
      alert('Por favor, selecciona una microempresa primero.');
    }
  }

  verMas() {
    if (this.indiceSeleccionado !== null) {
      const seleccionada = this.microempresas[this.indiceSeleccionado];
      alert(`Detalles:\nNombre: ${seleccionada.nombreNegocio}\nRubro: ${seleccionada.rubro}\nDirección: ${seleccionada.direccion}`);
    } else {
      alert('Selecciona una microempresa para ver más información.');
    }
  }

  eliminar() {
    if (this.indiceSeleccionado !== null) {
      const microempresaEliminada = this.microempresas[this.indiceSeleccionado];
      const id = microempresaEliminada.id_microempresa;

      const eliminados = JSON.parse(localStorage.getItem('eliminados') || '[]');
      eliminados.push(id);
      localStorage.setItem('eliminados', JSON.stringify(eliminados));

      this.microempresas.splice(this.indiceSeleccionado, 1);
      this.indiceSeleccionado = null;

      alert(`Microempresa "${microempresaEliminada.nombreNegocio}" eliminada visualmente.`);
    } else {
      alert('Selecciona una microempresa para eliminar.');
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
  //cambio
}
