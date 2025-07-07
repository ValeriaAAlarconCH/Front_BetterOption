import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogoPromociones } from '../../../models/catalogopromociones';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';


@Component({
  selector: 'app-listarcatalogopromociones',
  templateUrl: './listarcatalogopromociones.html',
  styleUrls: ['./listarcatalogopromociones.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButton,
    MatIconButton,
  ]
})
export class Listarcatalogopromociones implements OnInit {
  displayedColumns: string[] = ['id', 'nombreCatalogo', 'descripcion', 'fechaInicio', 'fechaFin'];
  dataSource: MatTableDataSource<CatalogoPromociones> = new MatTableDataSource<CatalogoPromociones>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  mostrarFavoritos = false;
  contadorActivas = 0;

  constructor(
    private catalogoService: CatalogoPromocionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const eliminados = JSON.parse(localStorage.getItem('catalogosEliminados') || '[]');
    const favoritos = JSON.parse(localStorage.getItem('favoritosCatalogos') || '[]');

    this.catalogoService.list().subscribe((data) => {
      let filtrados = data.filter(item => !eliminados.includes(item.id_catalogopromociones));

      if (this.mostrarFavoritos) {
        filtrados = filtrados.filter(item => favoritos.includes(item.id_catalogopromociones));
      }

      this.contadorActivas = filtrados.filter(item => new Date(item.fechaFin) > new Date()).length;

      this.dataSource = new MatTableDataSource<CatalogoPromociones>(filtrados);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: CatalogoPromociones, filter: string) => {
        const texto = filter.trim().toLowerCase();

        const nombre = data.nombreCatalogo?.toLowerCase() || '';
        const descripcion = data.descripcion?.toLowerCase() || '';
        const micro = (data.microempresa as any)?.nombreNegocio?.toLowerCase() || '';

        return nombre.includes(texto) || descripcion.includes(texto) || micro.includes(texto);
      };

    });
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  editar(id: number): void {
    this.router.navigate([`/catalogospromociones/registrar/${id}`]);
  }

  eliminar(id: number): void {
    if (confirm('¿Estás seguro de eliminar este catálogo?')) {
      let eliminados = JSON.parse(localStorage.getItem('catalogosEliminados') || '[]');
      eliminados.push(id);
      localStorage.setItem('catalogosEliminados', JSON.stringify(eliminados));
      this.dataSource.data = this.dataSource.data.filter(item => item.id_catalogopromociones !== id);
      this.contadorActivas = this.dataSource.data.filter(item => new Date(item.fechaFin) > new Date()).length;
    }
  }

  toggleFavorito(id: number): void {
    let favoritos = JSON.parse(localStorage.getItem('favoritosCatalogos') || '[]');
    if (favoritos.includes(id)) {
      favoritos = favoritos.filter((item: number) => item !== id);
    } else {
      favoritos.push(id);
    }
    localStorage.setItem('favoritosCatalogos', JSON.stringify(favoritos));
  }

  esFavorito(id: number): boolean {
    const favoritos = JSON.parse(localStorage.getItem('favoritosCatalogos') || '[]');
    return favoritos.includes(id);
  }

  alternarFavoritos(): void {
    this.mostrarFavoritos = !this.mostrarFavoritos;
    this.ngOnInit();
  }
  obtenerEstadoPromocion(fechaInicio: Date, fechaFin: Date): string {
    const hoy = new Date();
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);

    if (hoy < inicio) return 'No iniciada';
    if (hoy > fin) return '⛔ Vencido';

    const dias = this.diasRestantes(fechaFin);
    return dias <= 3 ? '⚠️ Por vencer' : '✅ Activo';
  }

  diasRestantes(fechaFin: Date): number {
    const hoy = new Date();
    const fin = new Date(fechaFin);
    const diff = fin.getTime() - hoy.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

}


