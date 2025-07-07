import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelect, MatOption, MatSelectModule} from '@angular/material/select';
import {ProductoService} from '../../../services/ProductoService';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../../../models/producto';
import {WishlistService} from '../../../services/WishlistService';
import {UsuarioService} from '../../../services/UsuarioService';
import {Wishlist} from '../../../models/wishlist';
import {Usuario} from '../../../models/usuario';

@Component({
  selector: 'app-nuevoeditawishlist',
    imports: [
      CommonModule,
      MatCard,
      MatCardTitle,
      MatCardContent,
      ReactiveFormsModule,
      MatFormField,
      MatLabel,
      MatInput,
      MatFormField,
      MatButton,
      MatInputModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatSelect,
      MatOption,
      MatFormFieldModule, MatInputModule, MatSelectModule,
    ],
  templateUrl: './nuevoeditawishlist.html',
  styleUrl: './nuevoeditawishlist.css'
})
export class Nuevoeditawishlist {
  wishlistForm: FormGroup;
  listausuarios: Usuario[] = [];
  listaproductos: Producto[] = [];

  fb = inject(FormBuilder);
  wishlistService = inject(WishlistService);
  usuarioService = inject(UsuarioService);
  productoService = inject(ProductoService);
  router = inject(Router);

  constructor() {
    this.wishlistForm = this.fb.group({
      fechaAgregado: [new Date(), Validators.required],
      usuario: [null, Validators.required],
      producto: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.usuarioService.list().subscribe(data => this.listausuarios = data);
    this.productoService.list().subscribe(data => this.listaproductos = data);
  }

  onSubmit() {
    const wishlist = new Wishlist();

    // No seteamos id_wishlist aquí, lo genera el backend
    wishlist.fechaAgregado = this.wishlistForm.value.fechaAgregado;

    // Usuario DTO con solo el ID
    const usuario = new Usuario();
    usuario.id_usuario = this.wishlistForm.value.usuario;
    wishlist.usuariodto = usuario;

    // Producto seleccionado desde la lista
    const productoSeleccionado = this.listaproductos.find(p => p.id_producto === this.wishlistForm.value.producto);
    if (!productoSeleccionado) {
      console.error("Producto no encontrado en la lista");
      return;
    }

    wishlist.productosdto = [productoSeleccionado];

    this.wishlistService.insert(wishlist).subscribe(() => {
      this.wishlistService.actualizarLista();
      this.router.navigate(['/wishlists']);
    }, err => {
      console.error('Error registrando wishlist', err);
    });
  }
}
