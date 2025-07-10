import {Component, inject, OnInit, signal} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogo} from '../../producto/listarproducto/confirm-dialogo/confirm-dialogo';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-listarproductocatalogo',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatExpansionModule,
    FormsModule
  ],
  templateUrl: './listarproductocatalogo.html',
  styleUrls: ['./listarproductocatalogo.css']
})
export class ListarproductocatalogoComponent implements OnInit {
  catalogos: any[] = [];
  productosCatalogo: any[] = [];
  panelOpenState = signal(false);
  filtroCatalogo: string = '';

  private dialog = inject(MatDialog);

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerCatalogos();
  }

  obtenerCatalogos(): void {
    this.http.get<any[]>('http://localhost:8080/catalogospromociones/listar').subscribe({
      next: (data) => {
        this.catalogos = data;
        this.obtenerProductosCatalogo();
      },
      error: (err) => {
        console.error('Error al cargar catálogos:', err);
        alert('Error al obtener los catálogos.');
      }
    });
  }

  obtenerProductosCatalogo(): void {
    this.http.get<any[]>('http://localhost:8080/productoscatalogos/listar').subscribe({
      next: (data) => {
        const eliminados = this.obtenerEliminadosLocalStorage();
        this.productosCatalogo = data.filter(p => !eliminados.includes(p.id_productocatalogo));

        this.catalogos.forEach((catalogo) => {
          catalogo.productos = this.productosCatalogo.filter(
            (p) => p.catalogopromocionesdto?.id_catalogopromociones === catalogo.id_catalogopromociones
          );
        });
      },
      error: (err) => {
        console.error('Error al cargar productos catálogo:', err);
        alert('Error al obtener los productos del catálogo.');
      }
    });
  }

  eliminarProductoCatalogo(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogo, {
      data: { mensaje: '¿Estás seguro de eliminar este producto del catálogo?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const eliminados = this.obtenerEliminadosLocalStorage();
        eliminados.push(id);
        localStorage.setItem('productosCatalogoEliminados', JSON.stringify(eliminados));
        this.obtenerProductosCatalogo();
      }
    });
  }

  obtenerEliminadosLocalStorage(): number[] {
    const data = localStorage.getItem('productosCatalogoEliminados');
    return data ? JSON.parse(data) : [];
  }

  volver(): void {
    this.router.navigate(['/']);
  }

  editarProducto(id: number): void {
    this.router.navigate(['/productoscatalogos/editar', id]);
  }

  catalogosFiltrados(): any[] {
    if (!this.filtroCatalogo.trim()) {
      return this.catalogos;
    }

    return this.catalogos.filter(c =>
      c.nombreCatalogo?.toLowerCase().includes(this.filtroCatalogo.trim().toLowerCase())
    );
  }
}
