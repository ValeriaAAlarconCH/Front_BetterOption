import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nuevoeditarmicroempresa',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './nuevoeditamicroempresa.html',
  styleUrls: ['./nuevoeditamicroempresa.css']
})
export class NuevoeditarmicroempresaComponent implements OnInit {
  microempresa = {
    nombreNegocio: '',
    rubro: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: '',
    idUsuario: null
  };

  usuarios: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:8080/usuarios/listar').subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        alert('No se pudieron cargar los usuarios desde el backend.');
      }
    });
  }

  registrarMicroempresa() {
    if (
      !this.microempresa.nombreNegocio ||
      !this.microempresa.rubro ||
      !this.microempresa.direccion ||
      !this.microempresa.telefono ||
      !this.microempresa.email ||
      !this.microempresa.descripcion ||
      this.microempresa.idUsuario === null
    ) {
      alert('Por favor, completa todos los campos antes de registrar.');
      return;
    }

    // Mapeo para backend
    const microempresaRequest = {
      nombreNegocio: this.microempresa.nombreNegocio,
      rubro: this.microempresa.rubro,
      direccion: this.microempresa.direccion,
      telefono: this.microempresa.telefono,
      email: this.microempresa.email,
      descripcion: this.microempresa.descripcion,
      usuariodto: { id_usuario: this.microempresa.idUsuario }
    };

    this.http.post('http://localhost:8080/microempresas/registrar', microempresaRequest).subscribe({
      next: () => {
        alert('Microempresa registrada exitosamente.');
        this.microempresa = {
          nombreNegocio: '',
          rubro: '',
          direccion: '',
          telefono: '',
          email: '',
          descripcion: '',
          idUsuario: null
        };
      },
      error: (err) => {
        console.error('Error al registrar microempresa:', err);
        alert('Hubo un error al registrar la microempresa.');
      }
    });
  }

  irAListaMicroempresas() {
    this.router.navigate(['/microempresas/listar']);
  }
}
