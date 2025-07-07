import {Component, inject} from '@angular/core';
import {MatOption} from '@angular/material/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Producto} from '../../../../models/producto';
import {ProductoService} from '../../../../services/ProductoService';
import {WishlistService} from '../../../../services/WishlistService';
import {ActivatedRoute, Router} from '@angular/router';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {MatSelect, MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-agregarproducto',
  imports: [
    CommonModule,
    MatOption,
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatFormFieldModule, MatInputModule, MatSelectModule
  ],
  templateUrl: './agregarproducto.html',
  styleUrl: './agregarproducto.css'
})
export class Agregarproducto {
  idWishlist: number;
  form: FormGroup;
  listaproductos: Producto[] = [];

  fb = inject(FormBuilder);
  productoService = inject(ProductoService);
  wishlistService = inject(WishlistService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    this.form = this.fb.group({
      producto: [null, Validators.required]
    });
    this.idWishlist = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productoService.list().subscribe(data => this.listaproductos = data);
  }

  onSubmit() {
    const productoId = this.form.value.producto;
    this.wishlistService.agregarProducto(this.idWishlist, productoId).subscribe(() => {
      this.wishlistService.actualizarLista();
      this.router.navigate(['/wishlists']);
    });
  }
}
