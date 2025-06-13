import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInput, MatInputModule} from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {MatNativeDateModule} from '@angular/material/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatHint, MatFormField, MatLabel} from '@angular/material/form-field';
import {CategoriaService} from '../../../services/CategoriaService';
import {Categoria} from '../../../models/categoria';

@Component({
  selector: 'app-nuevoeditacategoria',
  imports: [
    MatCard,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatFormField,
    // MatDatepickerToggle,
    // MatDatepicker,
    // MatDatepickerInput,
    MatButton,
    // MatHint,//add
    MatInputModule,//add
    MatDatepickerModule, // add
    MatNativeDateModule, // add
  ],
  templateUrl: './nuevoeditacategoria.html',
  styleUrl: './nuevoeditacategoria.css'
})
export class Nuevoeditacategoria {
  categoriaForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  categoriaService = inject(CategoriaService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.categoriaForm = this.fb.group({
      id_Categoria: [''],
      nombreCategoria : ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.cargaForm();
    });

  }

  cargaForm(){
    if(this.edicion){
      this.categoriaService.listId(this.id).subscribe((data:Categoria) => {
        console.log(data);
        this.categoriaForm.patchValue({
          nombreCategoria:data.nombreCategoria,
          descripcion:data.descripcion,
        });
      })
    }
  }//proveedorForm

  onSubmit(){
    if(this.categoriaForm.valid){
      const categoria : Categoria = new Categoria();
      categoria.id_categoria = this.id;
      categoria.nombreCategoria = this.categoriaForm.value.nombreCategoria;
      categoria.descripcion = this.categoriaForm.value.descripcion;
      if(!this.edicion){
        console.log("Datos leidos del form:", categoria);
        this.categoriaService.insert(categoria).subscribe((data) => {
          console.log(data);
          this.categoriaService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", categoria);
        this.categoriaService.update(categoria).subscribe((data) => {
          this.categoriaService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['categorias']);
    }
    else{
      console.log("Formulario no valido");
    }
  }
}
