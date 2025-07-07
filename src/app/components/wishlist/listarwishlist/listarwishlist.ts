import {Component, inject} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Wishlist} from '../../../models/wishlist';
import {WishlistService} from '../../../services/WishlistService';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogo} from '../../producto/listarproducto/confirm-dialogo/confirm-dialogo';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-listarwishlist',
  imports: [
    CommonModule,
    DatePipe,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatExpansionPanel,
    RouterLink,
    MatAccordion,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './listarwishlist.html',
  styleUrl: './listarwishlist.css'
})
export class Listarwishlist {
  lista: Wishlist[] = [];
  wishlistService = inject(WishlistService);
  dialog = inject(MatDialog);

  ngOnInit() {
    this.wishlistService.getListaCambio().subscribe(data => this.lista = data);
    this.wishlistService.actualizarLista();
  }

  eliminarWishlist(id: number) {
    this.dialog.open(ConfirmDialogo, {
      data: { mensaje: '¿Estás seguro de eliminar esta wishlist?' }
    }).afterClosed().subscribe(confirmado => {
      if (confirmado) {
        this.wishlistService.delete(id).subscribe(() => {
          this.wishlistService.actualizarLista();
        }, error => {
          console.error("Error al eliminar wishlist", error);
        });
      }
    });
  }

  eliminarProducto(wishlistId: number, productoId: number) {
    this.dialog.open(ConfirmDialogo, {
      data: { mensaje: '¿Estás seguro de eliminar este producto de la wishlist?' }
    }).afterClosed().subscribe(confirmado => {
      if (confirmado) {
        const wishlist = this.lista.find(w => w.id_wishlist === wishlistId);
        if (wishlist) {
          wishlist.productosdto = wishlist.productosdto.filter(p => p.id_producto !== productoId);
          this.wishlistService.update(wishlist).subscribe(() => {
            this.wishlistService.actualizarLista();
          });
        }
      }
    });
  }
}
