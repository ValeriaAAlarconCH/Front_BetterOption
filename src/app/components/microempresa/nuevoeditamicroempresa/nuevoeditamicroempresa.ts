import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nuevoeditarmicroempresa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevoeditamicroempresa.html',
  styleUrls: ['./nuevoeditamicroempresa.css']
})
export class NuevoeditarmicroempresaComponent {
  microempresa = {
    nombreNegocio: '',
    rubro: '',
    direccion: '',
    telefono: '',
    email: ''
  };

  constructor(private router: Router) {}

  registrarMicroempresa() {
    console.log('Registrada:', this.microempresa);
    this.microempresa = {
      nombreNegocio: '',
      rubro: '',
      direccion: '',
      telefono: '',
      email: ''
    };
  }

  irAListaMicroempresas() {
    this.router.navigate(['/microempresas/listar']);
  }
}
