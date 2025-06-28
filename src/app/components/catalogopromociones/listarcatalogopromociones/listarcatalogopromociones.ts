import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CatalogoPromociones } from '../../../models/catalogopromociones';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-listarcatalogopromociones',
  templateUrl: './listarcatalogopromociones.html',
  styleUrls: ['./listarcatalogopromociones.css'],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class Listarcatalogopromociones implements OnInit {
  displayedColumns: string[] = ['id', 'nombreCatalogo', 'descripcion', 'fechaInicio', 'fechaFin'];
  dataSource: MatTableDataSource<CatalogoPromociones> = new MatTableDataSource<CatalogoPromociones>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private catalogoService: CatalogoPromocionesService) {}

  ngOnInit(): void {
    this.catalogoService.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
