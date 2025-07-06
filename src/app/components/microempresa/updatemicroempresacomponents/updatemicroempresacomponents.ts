import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-updatemicroempresacomponents',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './updatemicroempresacomponents.html',
  styleUrl: './updatemicroempresacomponents.css'
})
export class updatemicroempresacomponents implements OnInit {
  private route = inject(ActivatedRoute);
  microempresa = {
    id_microempresa: 0,
    nombreNegocio: '',
    rubro: '',
    direccion: '',
    telefono: '',
    email: '',
    descripcion: '',
    idUsuario: 0
  };

  usuarios: any[] = [];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener la microempresa por ID
    this.http.get<any>(`http://localhost:8080/microempresas/listarid/${id}`).subscribe({
      next: (data) => {
        this.microempresa = {
          id_microempresa: data.id_microempresa,
          nombreNegocio: data.nombreNegocio,
          rubro: data.rubro,
          direccion: data.direccion,
          telefono: data.telefono,
          email: data.email,
          descripcion: data.descripcion,
          idUsuario: data.usuariodto?.id_usuario || 0
        };
      },
      error: (err) => {
        console.error('Error al obtener microempresa:', err);
        alert('No se pudo cargar la microempresa.');
      }
    });

    // Obtener todos los usuarios
    this.http.get<any[]>('http://localhost:8080/usuarios/listar').subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
        alert('No se pudieron cargar los usuarios.');
      }
    });
  }

  actualizar(): void {
    const microempresaRequest = {
      id_microempresa: this.microempresa.id_microempresa,
      nombreNegocio: this.microempresa.nombreNegocio,
      rubro: this.microempresa.rubro,
      direccion: this.microempresa.direccion,
      telefono: this.microempresa.telefono,
      email: this.microempresa.email,
      descripcion: this.microempresa.descripcion,
      usuariodto: {
        id_usuario: this.microempresa.idUsuario
      }
    };

    this.http.put<any>('http://localhost:8080/microempresas/actualizar', microempresaRequest).subscribe({
      next: () => {
        alert('Microempresa actualizada correctamente.');
        this.router.navigate(['/microempresas/listar']);
      },
      error: (err) => {
        console.error('Error al actualizar microempresa:', err);
        alert('Hubo un error al actualizar la microempresa.');
      }
    });
  }

  irAListaMicroempresas() {
    this.router.navigate(['/microempresas/listar']);
  }
}
