import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Router} from '@angular/router';
import {CategoriaService} from '../../../services/CategoriaService';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
