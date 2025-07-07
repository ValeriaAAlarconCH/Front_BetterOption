import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-nuevoeditaproductocatalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './nuevoeditaproductocatalogo.html',
  styleUrls: ['./nuevoeditaproductocatalogo.css']
})
export class Nuevoeditaproductocatalogo implements OnInit {
  productoCatalogo = {
    idProducto: null,
    descuentoPorcentaje: null,
    idCatalogo: null
  };

  idEditar: number | null = null;

  productos: any[] = [];
  catalogos: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.obtenerProductos();
    this.obtenerCatalogos();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.idEditar = +id;
        this.obtenerProductoCatalogoPorId(this.idEditar);
      }
    });
  }

  obtenerProductos(): void {
    this.http.get<any[]>('http://localhost:8080/productos/listar').subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
        alert('No se pudieron cargar los productos desde el backend.');
      }
    });
  }

  obtenerCatalogos(): void {
    this.http.get<any[]>('http://localhost:8080/catalogospromociones/listar').subscribe({
      next: (data) => {
        this.catalogos = data;
      },
      error: (err) => {
        console.error('Error al obtener catálogos:', err);
        alert('No se pudieron cargar los catálogos desde el backend.');
      }
    });
  }

  obtenerProductoCatalogoPorId(id: number): void {
    this.http.get<any>(`http://localhost:8080/productoscatalogos/listarid/${id}`).subscribe({
      next: (data) => {
        this.productoCatalogo = {
          idProducto: data.productodto.id_producto,
          descuentoPorcentaje: data.descuentoPorcentaje,
          idCatalogo: data.catalogopromocionesdto.id_catalogopromociones
        };
      },
      error: (err) => {
        console.error('Error al obtener el producto catálogo:', err);
        alert('Error al cargar los datos del producto catálogo.');
      }
    });
  }

  guardar(): void {
    const { idProducto, descuentoPorcentaje, idCatalogo } = this.productoCatalogo;

    if (idProducto === null || descuentoPorcentaje === null || idCatalogo === null) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const payload = {
      id_productocatalogo: this.idEditar ?? null,
      descuentoPorcentaje,
      productodto: { id_producto: idProducto },
      catalogopromocionesdto: { id_catalogopromociones: idCatalogo }
    };

    if (this.idEditar) {
      // Modo edición → usar PUT
      this.http.put('http://localhost:8080/productoscatalogos/actualizar', payload).subscribe({
        next: () => {
          alert('Producto actualizado correctamente.');
          this.router.navigate(['/productoscatalogos']);
        },
        error: (err) => {
          console.error('Error al actualizar producto catálogo:', err);
          alert('Hubo un error al actualizar el producto catálogo.');
        }
      });
    } else {
      // Modo registro → usar POST
      this.http.post('http://localhost:8080/productoscatalogos/registrar', payload).subscribe({
        next: () => {
          alert('Producto registrado correctamente.');
          this.router.navigate(['/productoscatalogos']);
        },
        error: (err) => {
          console.error('Error al registrar producto catálogo:', err);
          alert('Hubo un error al registrar el producto catálogo.');
        }
      });
    }
  }

  irAListaProductoCatalogo(): void {
    this.router.navigate(['/productoscatalogos']);
  }
}
