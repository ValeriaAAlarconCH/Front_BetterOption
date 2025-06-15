import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

import { Catalogopromociones } from '../../../models/catalogopromociones';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';

@Component({
  selector: 'app-nuevoeditacatalogopromociones',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatInputModule,
    MatButton
  ],
  templateUrl: './nuevoeditacatalogopromociones.html',
  styleUrl: './nuevoeditacatalogopromociones.css',
  standalone: true
})
export class Nuevoeditacatalogopromociones {
  form: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  router = inject(Router);
  route = inject(ActivatedRoute);
  catalogoService = inject(CatalogoPromocionesService);

  id: number = 0;
  edicion: boolean = false;

  constructor() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.edicion = this.id != null;
      if (this.edicion) {
        this.cargarFormulario();
      }
    });
  }

  cargarFormulario() {
    this.catalogoService.obtenerPorId(this.id).subscribe((data: Catalogopromociones) => {
      this.form.patchValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio
      });
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const promocion: Catalogopromociones = {
      id: this.id,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio
    };

    if (this.edicion) {
      this.catalogoService.update(promocion).subscribe(() => {
        console.log("Promoción actualizada");
        this.router.navigate(['/catalogopromociones']);
      });
    } else {
      this.catalogoService.insertar(promocion).subscribe(() => {
        console.log("Promoción registrada");
        this.router.navigate(['/catalogopromociones']);
      });
    }
  }
}
