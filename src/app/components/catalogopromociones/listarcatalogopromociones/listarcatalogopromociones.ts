import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CatalogoPromociones } from '../../../models/catalogopromociones';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // NECESARIO

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
    MatLabel,
    MatFormField,
    MatInputModule
  ]
})
export class Listarcatalogopromociones implements OnInit {
  displayedColumns: string[] = ['id', 'nombreCatalogo', 'descripcion', 'fechaInicio', 'fechaFin'];
  dataSource: MatTableDataSource<CatalogoPromociones> = new MatTableDataSource<CatalogoPromociones>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private catalogoService: CatalogoPromocionesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let eliminados = JSON.parse(localStorage.getItem('catalogosEliminados') || '[]');

    this.catalogoService.list().subscribe((data) => {
      this.dataSource.data = data.filter(item => !eliminados.includes(item.id_catalogopromociones));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data: CatalogoPromociones, filter: string) => {
        const nombre = data.nombreCatalogo?.toLowerCase() || '';
        const descripcion = data.descripcion?.toLowerCase() || '';
        const micro = (data.microempresa as any)?.nombreNegocio?.toLowerCase() || '';
        return (
          nombre.includes(filter) ||
          descripcion.includes(filter) ||
          micro.includes(filter)
        );
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
    }
  }
}
