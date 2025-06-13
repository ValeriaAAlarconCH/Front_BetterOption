import {Component, inject, ViewChild} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {Router} from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {CategoriaService} from '../../../services/CategoriaService';
import {Categoria} from '../../../models/categoria';


@Component({
  selector: 'app-listarcategoria',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    MatSortHeader,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatPaginator
  ],
  templateUrl: './listarcategoria.html',
  styleUrl: './listarcategoria.css'
})
export class Listarcategoria {
  lista: Categoria[] = [];
  displayedColumns: string[] = ['id_categoria', 'nombreCategoria', 'descripcion'];
  dataSource: MatTableDataSource<Categoria> = new MatTableDataSource<Categoria>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  categoriaService: CategoriaService = inject(CategoriaService);
  route : Router = inject(Router);
  constructor() {
    console.log("Constructor")
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    console.log('Component ngOnInit llamando al API Get');
    this.categoriaService.getListaCambio().subscribe({
      next: data => this.dataSource.data = data
    })
    this.categoriaService.actualizarLista();
  }
}
