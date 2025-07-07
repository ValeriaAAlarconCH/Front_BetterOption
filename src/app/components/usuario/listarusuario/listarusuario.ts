import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/UsuarioService';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {Usuario} from '../../../models/usuario';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  templateUrl: './listarusuario.html',
  styleUrls: ['./listarusuario.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule
  ]
})

export class ListarusuarioComponent implements OnInit {
  usuarios: Usuario[] = [];
  filtro: string = '';
  usuariosFiltrados: Usuario[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.getListaCambio().subscribe(data => {
      const eliminados = JSON.parse(localStorage.getItem('eliminadosUsuarios') || '[]');
      this.usuarios = data.filter((u: Usuario) => !eliminados.includes(u.id_usuario));
      this.aplicarFiltro();
    });
    this.usuarioService.actualizarLista();
  }

  aplicarFiltro(): void {
    const termino = this.filtro.toLowerCase();
    this.usuariosFiltrados = this.usuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(termino) ||
      usuario.correo.toLowerCase().includes(termino)
    );
  }

  actualizar(id: number): void {
    this.router.navigate(['/usuarios/actualizar', id]);
  }

  eliminar(id: number): void {
    const confirmacion = confirm('¿Estás seguro de eliminar este usuario?');
    if (confirmacion) {
      const index = this.usuarios.findIndex(u => u.id_usuario === id);
      if (index !== -1) {
        const eliminados = JSON.parse(localStorage.getItem('eliminadosUsuarios') || '[]');
        eliminados.push(id);
        localStorage.setItem('eliminadosUsuarios', JSON.stringify(eliminados));
        this.usuarios.splice(index, 1);
        this.aplicarFiltro();
        alert('Usuario eliminado visualmente.');
      }
    }
  }
}
