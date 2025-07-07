import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-listarproductocatalogo',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    MatExpansionModule
  ],
  templateUrl: './listarproductocatalogo.html',
  styleUrls: ['./listarproductocatalogo.css']
})
export class ListarproductocatalogoComponent implements OnInit {
  catalogos: any[] = [];
  productosCatalogo: any[] = [];
  panelOpenState = signal(false);

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

        // Asociar productos a cada catálogo
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
    const eliminados = this.obtenerEliminadosLocalStorage();
    eliminados.push(id);
    localStorage.setItem('productosCatalogoEliminados', JSON.stringify(eliminados));
    this.obtenerProductosCatalogo();
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

}
