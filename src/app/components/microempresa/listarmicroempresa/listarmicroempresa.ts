import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listarmicroempresa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listarmicroempresa.html',
  styleUrls: ['./listarmicroempresa.css']
})
export class ListarmicroempresaComponent {
  microempresas = [
    { nombre: 'Microempresa 1' },
    { nombre: 'Microempresa 2' },
    { nombre: 'Microempresa 3' },
    { nombre: 'Microempresa 4' },
    { nombre: 'Microempresa 5' },
    { nombre: 'Microempresa 6' }
  ];

  indiceSeleccionado: number | null = null;

  constructor(private router: Router) {}

  seleccionar(index: number) {
    this.indiceSeleccionado = index;
  }

  confirmarSeleccion() {
    if (this.indiceSeleccionado !== null) {
      const seleccionada = this.microempresas[this.indiceSeleccionado];
      alert(`Seleccionaste: ${seleccionada.nombre}`);
    } else {
      alert('Por favor, selecciona una microempresa primero.');
    }
  }

  verMas() {
    if (this.indiceSeleccionado !== null) {
      const seleccionada = this.microempresas[this.indiceSeleccionado];
      alert(`Información detallada de: ${seleccionada.nombre}`);
    } else {
      alert('Selecciona una microempresa para ver más información.');
    }
  }

  eliminar() {
    if (this.indiceSeleccionado !== null) {
      const eliminado = this.microempresas[this.indiceSeleccionado].nombre;
      this.microempresas.splice(this.indiceSeleccionado, 1);
      this.indiceSeleccionado = null;
      alert(`Se eliminó: ${eliminado}`);
    } else {
      alert('Selecciona una microempresa para eliminar.');
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}
