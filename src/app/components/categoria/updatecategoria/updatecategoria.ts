import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-updatecategoria',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './updatecategoria.html',
  styleUrl: './updatecategoria.css'
})
export class UpdatecategoriaComponent implements OnInit {
  private route = inject(ActivatedRoute);
  categoria = {
    id_categoria: 0,
    nombreCategoria: '',
    descripcion: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Obtener la categoría por ID
    this.http.get<any>(`http://localhost:8080/categorias/listarid/${id}`).subscribe({
      next: (data) => {
        this.categoria = {
          id_categoria: data.id_categoria,
          nombreCategoria: data.nombreCategoria,
          descripcion: data.descripcion
        };
      },
      error: (err) => {
        console.error('Error al obtener categoría:', err);
        alert('No se pudo cargar la categoría.');
      }
    });
  }

  actualizar(): void {
    const categoriaRequest = {
      id_categoria: this.categoria.id_categoria,
      nombreCategoria: this.categoria.nombreCategoria,
      descripcion: this.categoria.descripcion
    };

    this.http.put<any>('http://localhost:8080/categorias/actualizar', categoriaRequest).subscribe({
      next: () => {
        alert('Categoría actualizada correctamente.');
        this.router.navigate(['/categorias']);
      },
      error: (err) => {
        console.error('Error al actualizar categoría:', err);
        alert('Hubo un error al actualizar la categoría.');
      }
    });
  }

  irAListaCategorias() {
    this.router.navigate(['/categorias']);
  }
}
