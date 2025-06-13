import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule, MatOption} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {ProductoService} from '../../../services/ProductoService';
import {Producto} from '../../../models/producto';
import {CategoriaService} from '../../../services/CategoriaService';
import {MicroempresaService} from '../../../services/MicroempresaService';
import {Microempresa} from '../../../models/microempresa';
import {Categoria} from '../../../models/categoria';
import {MatSelect} from '@angular/material/select';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-nuevoeditaproducto',
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
  templateUrl: './nuevoeditaproducto.html',
  styleUrl: './nuevoeditaproducto.css'
})
export class Nuevoeditaproducto {
  productoForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  productoService: ProductoService = inject(ProductoService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;
  microempresas: any[] = [];
  categorias: any[] = [];
  microempresaService: MicroempresaService = inject(MicroempresaService);
  categoriaService: CategoriaService = inject(CategoriaService);

  constructor() {
    this.productoForm = this.fb.group({
      id_Producto: [''],
      nombreProducto : ['', Validators.required],
      descripcion : ['', Validators.required],
      precio: ['', Validators.required],
      stock : ['', [Validators.required]],
      imagen: ['', Validators.required],
      microempresa: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargaForm();
    });

      this.categoriaService.list().subscribe((data) => {
        this.categorias = data;
      });

      this.microempresaService.list().subscribe((data) => {
        this.microempresas = data;
      });

  }

  cargaForm(){
    if(this.edicion){
      this.productoService.listId(this.id).subscribe((data:Producto) => {
        console.log(data);
        this.productoForm.patchValue({
          nombreProducto:data.nombreProducto,
          descripcion:data.descripcion,
          precio:data.precio,
          stock:data.stock,
          imagen:data.imagen,
          categoriadto: {
            id_categoria: data.categoriadto.id_categoria
          },
          microempresadto: {
            id_microempresa: data.microempresadto.id_microempresa
          }
        });
      })
    }
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const producto: Producto = new Producto();
      producto.id_Producto = this.id;
      producto.nombreProducto = this.productoForm.value.nombreProducto;
      producto.descripcion = this.productoForm.value.descripcion;
      producto.precio = this.productoForm.value.precio;
      producto.stock = this.productoForm.value.stock;
      producto.imagen = this.productoForm.value.imagen;

      producto.categoriadto = { id_categoria: this.productoForm.value.categoria } as Categoria;
      producto.microempresadto = { id_microempresa: this.productoForm.value.microempresa } as Microempresa;

      if (!this.edicion) {
        console.log("Datos leídos del form:", producto);
        this.productoService.insert(producto).subscribe((data) => {
          console.log(data);
          this.productoService.actualizarLista();
          console.log("Lista actualizada");
        });
      } else {
        this.productoService.update(producto).subscribe(() => {
          this.productoService.actualizarLista();
          console.log("Producto actualizado");
        });
      }

      this.router.navigate(['productos']);
    } else {
      console.log("Formulario no válido");
    }
  }

}
