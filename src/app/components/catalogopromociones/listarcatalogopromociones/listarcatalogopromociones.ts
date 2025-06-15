import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Catalogopromociones } from '../../../models/catalogopromociones';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';

@Component({
  selector: 'app-listarcatalogopromociones',
  standalone: true,
  templateUrl: './listarcatalogopromociones.html',
  styleUrl: './listarcatalogopromociones.css',
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class Listarcatalogopromociones implements OnInit {
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'precio'];
  dataSource = new MatTableDataSource<Catalogopromociones>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  catalogoService = inject(CatalogoPromocionesService);

  ngOnInit(): void {
    this.catalogoService.listar().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
