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
  productoForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  productoService: ProductoService = inject(ProductoService);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  microempresaService: MicroempresaService = inject(MicroempresaService);
  categoriaService: CategoriaService = inject(CategoriaService);

  microempresas: Microempresa[] = [];
  categorias: Categoria[] = [];
  id: number = 0;
  edicion: boolean = false;
  imagenPreview: string = '';

  constructor() {
    this.productoForm = this.fb.group({
      id_producto: [''],
      nombreProducto: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      imagen: ['', Validators.required],
      microempresa: ['', Validators.required],
      categoria: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.cargaForm();
      }
    });

    this.categoriaService.list().subscribe(data => this.categorias = data);
    this.microempresaService.list().subscribe(data => this.microempresas = data);
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        this.productoForm.patchValue({ imagen: base64 });
        this.imagenPreview = base64;
      };
      reader.readAsDataURL(file);
    }
  }

  cargaForm() {
    this.productoService.listId(this.id).subscribe((data: Producto) => {
      this.imagenPreview = data.imagen;
      this.productoForm.patchValue({
        nombreProducto: data.nombreProducto,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock,
        imagen: data.imagen,
        microempresa: data.microempresadto.id_microempresa,
        categoria: data.categoriadto.id_categoria
      });
    });
  }

  onSubmit() {
    if (this.productoForm.valid) {
      const producto: Producto = {
        ...new Producto(),
        ...this.productoForm.value,
        microempresadto: { id_microempresa: this.productoForm.value.microempresa } as Microempresa,
        categoriadto: { id_categoria: this.productoForm.value.categoria } as Categoria
      };

      const callback = () => {
        this.productoService.actualizarLista();
        this.router.navigate(['productos']);
      };

      if (this.edicion) {
        producto.id_producto = this.id;
        this.productoService.update(producto).subscribe(callback);
      } else {
        this.productoService.insert(producto).subscribe(callback);
      }
    } else {
      console.log("Formulario no válido");
    }
  }
}
