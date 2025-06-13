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
import {Usuario} from '../../../models/usuario';
import {UsuarioService} from '../../../services/UsuarioService';


@Component({
  selector: 'app-listarusuario',
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
  templateUrl: './listarusuario.html',
  styleUrl: './listarusuario.css'
})
export class Listarusuario {
  lista: Usuario[] = [];
  displayedColumns: string[] = ['id_usuario', 'nombre', 'correo', 'password','rol','fecha_registro'];
  dataSource: MatTableDataSource<Usuario> = new MatTableDataSource<Usuario>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  usuarioService: UsuarioService = inject(UsuarioService);
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
    this.usuarioService.getListaCambio().subscribe({
      next: data => this.dataSource.data = data
    })
    this.usuarioService.actualizarLista();
  }
}
