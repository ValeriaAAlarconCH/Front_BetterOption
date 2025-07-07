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

@Component({
  selector: 'app-listarcategoria',
  standalone: true,
  templateUrl: './listarcategoria.html',
  styleUrls: ['./listarcategoria.css'],
  imports: [
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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('✔️ Component ngOnInit llamando al API Get');
    this.categoriaService.getListaCambio().subscribe(data => {
      // Aplica eliminación visual si hay categorías marcadas como eliminadas
      const eliminadas = JSON.parse(localStorage.getItem('eliminadas') || '[]');
      this.categorias = data.filter((c: any) => !eliminadas.includes(c.id_categoria));
      this.dataSource.data = this.categorias;
    });
    this.categoriaService.actualizarLista();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
