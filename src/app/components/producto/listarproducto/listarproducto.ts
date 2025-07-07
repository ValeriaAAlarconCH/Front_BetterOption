import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {ProductoService} from '../../../services/ProductoService';
import {Producto} from '../../../models/producto';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {ConfirmDialogo} from './confirm-dialogo/confirm-dialogo';
import {MatDialog} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-listarproducto',
  standalone: true,
  imports: [
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ],
  templateUrl: './listarproducto.html',
  styleUrl: './listarproducto.css'
})
export class Listarproducto {
  lista: Producto[] = [];
  listaFiltrada: Producto[] = [];
  filtro: string = '';

  productoService = inject(ProductoService);
  route = inject(Router);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.productoService.getListaCambio().subscribe({
      next: (data) => {
        const eliminados = JSON.parse(localStorage.getItem('productosEliminados') || '[]');
        this.lista = data.filter(p => !eliminados.includes(p.id_producto));
        this.listaFiltrada = [...this.lista];
      }
    });
    this.productoService.actualizarLista();
  }

  actualizar(id: number): void {
    this.route.navigate(['/productos/actualizar', id]);
  }

  confirmarEliminacion(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogo, {
      data: {
        mensaje: '¿Estás seguro de eliminar este producto?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.eliminar(id);
      }
    });
  }

  eliminar(id: number): void {
    const index = this.lista.findIndex(p => p.id_producto === id);
    if (index !== -1) {
      const eliminados = JSON.parse(localStorage.getItem('productosEliminados') || '[]');
      eliminados.push(id);
      localStorage.setItem('productosEliminados', JSON.stringify(eliminados));
      this.lista.splice(index, 1);
      this.aplicarFiltro();
    }
  }

  aplicarFiltro(): void {
    const filtroLower = this.filtro.toLowerCase();
    this.listaFiltrada = this.lista.filter(producto =>
      producto.nombreProducto.toLowerCase().includes(filtroLower) ||
      producto.descripcion.toLowerCase().includes(filtroLower) ||
      producto.categoriadto?.nombreCategoria.toLowerCase().includes(filtroLower) ||
      producto.microempresadto?.nombreNegocio.toLowerCase().includes(filtroLower)
    );
  }
}
