import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../services/UsuarioService';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listarusuario',
  standalone: true,
  templateUrl: './listarusuario.html',
  styleUrls: ['./listarusuario.css'],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ]
})

export class ListarusuarioComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id_usuario', 'nombre', 'correo', 'password', 'rol', 'fecharegistro', 'acciones'];
  dataSource = new MatTableDataSource<any>();
  usuarios: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log('✔️ Component ngOnInit llamando al API Get');
    this.usuarioService.getListaCambio().subscribe(data => {
      const eliminados = JSON.parse(localStorage.getItem('eliminadosUsuarios') || '[]');
      this.usuarios = data.filter((u: any) => !eliminados.includes(u.id_usuario));
      this.dataSource.data = this.usuarios;
    });
    this.usuarioService.actualizarLista();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  actualizar(id: number): void {
    this.router.navigate(['/usuarios/actualizar', id]);
  }

  eliminar(id: number): void {
    const confirmacion = confirm('¿Estás seguro de eliminar este usuario?');
    if (confirmacion) {
      const index = this.usuarios.findIndex(u => u.id_usuario === id);
      if (index !== -1) {
        const eliminados = JSON.parse(localStorage.getItem('eliminadosUsuarios') || '[]');
        eliminados.push(id);
        localStorage.setItem('eliminadosUsuarios', JSON.stringify(eliminados));

        this.usuarios.splice(index, 1);
        this.dataSource.data = [...this.usuarios];
        alert('Usuario eliminado visualmente.');
      }
    }
  }
}
