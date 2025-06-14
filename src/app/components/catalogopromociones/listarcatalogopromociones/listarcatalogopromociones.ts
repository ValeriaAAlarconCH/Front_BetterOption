import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { Catalogopromociones } from '../../../models/catalogopromociones';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';

@Component({
  selector: 'app-listarcatalogopromociones',
  templateUrl: './listarcatalogopromociones.html',
  imports: [
    MatPaginator,
    MatTable
  ],
  styleUrl: './listarcatalogopromociones.css'
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
