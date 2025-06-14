import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatInput, MatInputModule, MatLabel} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {MatFormField} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
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
      MatOption
    ],
  templateUrl: './nuevoeditawishlist.html',
  styleUrl: './nuevoeditawishlist.css'
})
export class Nuevoeditawishlist {
  wishlistForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  wishlistService: WishlistService = inject(WishlistService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;
  usuarios: any[] = [];
  productos: any[] = [];
  usuarioService: UsuarioService = inject(UsuarioService);
  productoService: ProductoService = inject(ProductoService);

  constructor() {
    this.wishlistForm = this.fb.group({
      id_wishlist: [''],
      fechaAgregado : ['', Validators.required],
      usuario: ['', Validators.required],
      producto: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargaForm();
    });

    this.productoService.list().subscribe((data) => {
      this.productos = data;
    });

    this.usuarioService.list().subscribe((data) => {
      this.usuarios = data;
    });

  }

  cargaForm(){
    if(this.edicion){
      this.wishlistService.listId(this.id).subscribe((data:Wishlist) => {
        console.log(data);
        this.wishlistForm.patchValue({
          fechaAgregado : data.fechaAgregado,
          usuario: data.usuariodto?.id_usuario,
          producto: data.productodto?.id_producto
        });
      })
    }
  }

  onSubmit() {
    if (this.wishlistForm.valid) {
      const wishlist: Wishlist = new Wishlist();
      wishlist.id_wishlist= this.id;
      wishlist.fechaAgregado = this.wishlistForm.value.fechaAgregado;

      wishlist.usuariodto = { id_usuario: this.wishlistForm.value.usuario } as Usuario;

      wishlist.productodto = { id_producto: this.wishlistForm.value.producto } as Producto;

      if (!this.edicion) {
        console.log("Datos leídos del form:", wishlist);
        this.wishlistService.insert(wishlist).subscribe((data) => {
          console.log(data);
          this.wishlistService.actualizarLista();
          console.log("Lista actualizada");
        });
      } else {
        this.wishlistService.update(wishlist).subscribe(() => {
          this.wishlistService.actualizarLista();
          console.log("Wishlist actualizado");
        });
      }

      this.router.navigate(['wishlists']);
    } else {
      console.log("Formulario no válido");
    }
  }

}
