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

@Component({
  selector: 'app-listarwishlist',
  imports: [
    CommonModule,
    DatePipe,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatAccordion,
    MatExpansionPanel,
    RouterLink
  ],
  templateUrl: './listarwishlist.html',
  styleUrl: './listarwishlist.css'
})
export class Listarwishlist {
  lista: Wishlist[] = [];
  wishlistService = inject(WishlistService);

  ngOnInit() {
    this.wishlistService.getListaCambio().subscribe(data => this.lista = data);
    this.wishlistService.actualizarLista();
  }
}
