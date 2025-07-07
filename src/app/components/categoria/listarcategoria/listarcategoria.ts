import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../services/CategoriaService';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import {MatInput, MatLabel} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {Producto} from '../../../models/producto';
import {Categoria} from '../../../models/categoria';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-listarcategoria',
  standalone: true,
  templateUrl: './listarcategoria.html',
  styleUrls: ['./listarcategoria.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ]
})

export class ListarcategoriaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id_categoria', 'nombreCategoria', 'descripcion', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  categorias: any[] = [];
  filtro: string = ''; // 👈 Nuevo campo para la barra de búsqueda

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriaService.getListaCambio().subscribe(data => {
      const eliminadas = JSON.parse(localStorage.getItem('eliminadas') || '[]');
      this.categorias = data.filter((c: any) => !eliminadas.includes(c.id_categoria));
      this.dataSource.data = this.categorias;
    });

    // Configura el filtro para buscar por nombre o descripción
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const texto = filter.trim().toLowerCase();
      return data.nombreCategoria.toLowerCase().includes(texto) ||
        data.descripcion.toLowerCase().includes(texto);
    };

    this.categoriaService.actualizarLista();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.filtro.trim().toLowerCase();
  }

  actualizar(id: number): void {
    this.router.navigate(['/categorias/actualizar', id]);
  }

  eliminar(id: number): void {
    const confirmacion = confirm('¿Estás seguro de eliminar esta categoría?');
    if (confirmacion) {
      const index = this.categorias.findIndex(c => c.id_categoria === id);
      if (index !== -1) {
        const eliminadas = JSON.parse(localStorage.getItem('eliminadas') || '[]');
        eliminadas.push(id);
        localStorage.setItem('eliminadas', JSON.stringify(eliminadas));

        this.categorias.splice(index, 1);
        this.dataSource.data = [...this.categorias];
        alert('Categoría eliminada visualmente.');
      }
    }
  }
}
