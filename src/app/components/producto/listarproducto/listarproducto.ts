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


@Component({
  selector: 'app-listarproducto',
  imports: [
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './listarproducto.html',
  styleUrl: './listarproducto.css'
})
export class Listarproducto {
  lista: Producto[] = [];
  productoService: ProductoService = inject(ProductoService);
  route: Router = inject(Router);

  constructor() {}

  ngOnInit() {
    this.productoService.getListaCambio().subscribe({
      next: (data) => (this.lista = data),
    });
    this.productoService.actualizarLista();
  }

}
