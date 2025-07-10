import {Component, OnInit} from '@angular/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {CatalogoPromociones} from '../../../models/catalogopromociones';
import {CatalogoPromocionesService} from '../../../services/CatalogoPromocionesService';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {MatButton, MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-listarcatalogopromociones',
  templateUrl: './listarcatalogopromociones.html',
  styleUrls: ['./listarcatalogopromociones.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButton,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ]
})
export class Listarcatalogopromociones implements OnInit {
  dataOriginal: CatalogoPromociones[] = [];
  dataSource: CatalogoPromociones[] = [];
  mostrarFavoritos: boolean = false;
  contadorActivas: number = 0;
  filtroTexto: string = '';

  constructor(
    private catalogoService: CatalogoPromocionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.catalogoService.list().subscribe({
      next: (data) => {
        this.dataOriginal = data;
        this.aplicarFiltros();
      },
      error: (err) => {
        console.error('Error al obtener catálogos:', err);
      }
    });
  }

  aplicarFiltros(): void {
    const eliminados = JSON.parse(localStorage.getItem('catalogosEliminados') || '[]');
    const favoritos = JSON.parse(localStorage.getItem('favoritosCatalogos') || '[]');

    let filtrados = this.dataOriginal.filter(c => !eliminados.includes(c.id_catalogopromociones));

    if (this.mostrarFavoritos) {
      filtrados = filtrados.filter(c => favoritos.includes(c.id_catalogopromociones));
    }

    if (this.filtroTexto.trim() !== '') {
      const texto = this.filtroTexto.trim().toLowerCase();
      filtrados = filtrados.filter(item => {
        return (
          item.nombreCatalogo?.toLowerCase().includes(texto) ||
          item.descripcion?.toLowerCase().includes(texto) ||
          item.microempresadto?.nombreNegocio?.toLowerCase().includes(texto)
        );
      });
    }

    this.dataSource = filtrados;
    this.contadorActivas = filtrados.filter(c => new Date(c.fechaFin) > new Date()).length;
  }

  editar(id: number): void {
    this.router.navigate(['/catalogospromociones/actualizar', id]);
  }

  eliminar(id: number): void {
    if (confirm('¿Deseas eliminar este catálogo?')) {
      let eliminados = JSON.parse(localStorage.getItem('catalogosEliminados') || '[]');
      if (!eliminados.includes(id)) {
        eliminados.push(id);
        localStorage.setItem('catalogosEliminados', JSON.stringify(eliminados));
      }
      this.aplicarFiltros();
    }
  }

  toggleFavorito(id: number): void {
    let favoritos = JSON.parse(localStorage.getItem('favoritosCatalogos') || '[]');
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter((fid: number) => fid !== id);
    } else {
      favoritos.push(id);
    }
    localStorage.setItem('favoritosCatalogos', JSON.stringify(favoritos));
    this.aplicarFiltros();
  }

  esFavorito(id: number): boolean {
    const favoritos = JSON.parse(localStorage.getItem('favoritosCatalogos') || '[]');
    return favoritos.includes(id);
  }

  alternarFavoritos(): void {
    this.mostrarFavoritos = !this.mostrarFavoritos;
    this.aplicarFiltros();
  }

  obtenerEstadoPromocion(fechaInicio: Date, fechaFin: Date): string {
    const hoy = new Date();
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    if (hoy < inicio) return 'No iniciada';
    if (hoy > fin) return '⛔ Vencido';
    const dias = this.diasRestantes(fechaFin);
    return dias <= 3 ? '⚠ Por vencer' : '✅ Activo';
  }

  diasRestantes(fechaFin: Date): number {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diff = fin.getTime() - hoy.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}
