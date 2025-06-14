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
} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {DatePipe} from '@angular/common';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {Wishlist} from '../../../models/wishlist';
import {WishlistService} from '../../../services/WishlistService';

@Component({
  selector: 'app-listarwishlist',
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderRowDef,
    MatRowDef,
    MatSort,
    MatCellDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatHeaderRow,
    MatRow,
    MatPaginator,
    DatePipe
  ],
  templateUrl: './listarwishlist.html',
  styleUrl: './listarwishlist.css'
})
export class Listarwishlist {
  lista: Wishlist[] = [];
  displayedColumns: string[] = ['id_wishlist', 'fechaAgregado', 'usuario', 'producto'];
  dataSource: MatTableDataSource<Wishlist> = new MatTableDataSource<Wishlist>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  wishlistService: WishlistService = inject(WishlistService);
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
    this.wishlistService.getListaCambio().subscribe({
      next: data => this.dataSource.data = data
    })
    this.wishlistService.actualizarLista();
  }

}
