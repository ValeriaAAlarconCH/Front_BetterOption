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
import {ProductoService} from '../../../services/ProductoService';
import {Producto} from '../../../models/producto';


@Component({
  selector: 'app-listarproducto',
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
  templateUrl: './listarproducto.html',
  styleUrl: './listarproducto.css'
})
export class Listarproducto {
  lista: Producto[] = [];
  displayedColumns: string[] = ['id_producto', 'nombreProducto', 'descripcion', 'categoria', 'precio', 'stock', 'microempresa', 'imagen'];
  dataSource: MatTableDataSource<Producto> = new MatTableDataSource<Producto>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  productoService: ProductoService = inject(ProductoService);
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
    this.productoService.getListaCambio().subscribe({
      next: data => this.dataSource.data = data
    })
    this.productoService.actualizarLista();
  }

}
