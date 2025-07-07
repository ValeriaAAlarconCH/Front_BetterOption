import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
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
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatDatepickerModule,
      MatNativeDateModule,
    ],
  templateUrl: './nuevoeditawishlist.html',
  styleUrl: './nuevoeditawishlist.css'
})
export class Nuevoeditawishlist {
  wishlistForm: FormGroup;
  listausuarios: Usuario[] = [];
  listaproductos: Producto[] = [];
  id: number | null = null;

  fb = inject(FormBuilder);
  wishlistService = inject(WishlistService);
  usuarioService = inject(UsuarioService);
  productoService = inject(ProductoService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.wishlistForm = this.fb.group({
      fechaAgregado: [new Date(), Validators.required],
      usuario: [null, Validators.required],
      productos: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.usuarioService.list().subscribe(data => this.listausuarios = data);
    this.productoService.list().subscribe(data => this.listaproductos = data);

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.wishlistService.listId(this.id).subscribe(w => {
        this.wishlistForm.patchValue({
          fechaAgregado: new Date(w.fechaAgregado),
          usuario: w.usuariodto.id_usuario,
          productos: w.productosdto.map((p: Producto) => p.id_producto)
        });
      });
    }
  }

  onSubmit() {
    const wishlist = new Wishlist();
    wishlist.fechaAgregado = this.wishlistForm.value.fechaAgregado;

    const usuario = new Usuario();
    usuario.id_usuario = this.wishlistForm.value.usuario;
    wishlist.usuariodto = usuario;

    wishlist.productosdto = this.listaproductos.filter((p: Producto) =>
      this.wishlistForm.value.productos.includes(p.id_producto)
    );

    const accion = this.id ? this.wishlistService.update(wishlist) : this.wishlistService.insert(wishlist);
    accion.subscribe(() => {
      this.wishlistService.actualizarLista();
      this.router.navigate(['/wishlists']);
    }, err => {
      console.error('Error guardando wishlist', err);
    });
  }
}
