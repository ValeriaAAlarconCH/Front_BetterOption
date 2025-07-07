import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CatalogoPromocionesService } from '../../../services/CatalogoPromocionesService';
import { CatalogoPromociones } from '../../../models/catalogopromociones';
import { MicroempresaService } from '../../../services/MicroempresaService';
import { Microempresa } from '../../../models/microempresa';

@Component({
  selector: 'app-nuevoeditacatalogopromociones',
  standalone: true,
  templateUrl: './nuevoeditacatalogopromociones.html',
  styleUrls: ['./nuevoeditacatalogopromociones.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class NuevoEditaCatalogoPromociones implements OnInit {
  private catalogoService = inject(CatalogoPromocionesService);
  private microService = inject(MicroempresaService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  form!: FormGroup;
  idCatalogo: number = 0;
  listaMicroempresas: Microempresa[] = [];

  ngOnInit(): void {
    this.form = this.fb.group({
      id_catalogopromociones: [0],
      nombreCatalogo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      microempresadto: [null, Validators.required] //
    });


    this.microService.list().subscribe(data => {
      this.listaMicroempresas = data;
    });

    this.activatedRoute.params.subscribe(params => {
      this.idCatalogo = params['id'];
      if (this.idCatalogo) {
        this.catalogoService.listId(this.idCatalogo).subscribe(data => {
          this.form.patchValue(data);
        });
      }
    });
  }

  guardar(): void {
    const catalogo: CatalogoPromociones = this.form.value;

    if (this.idCatalogo > 0) {
      this.catalogoService.update(catalogo).subscribe(() => {
        alert('Catálogo actualizado correctamente');
        this.router.navigate(['/catalogospromociones']); // <- redirección aquí
      });
    } else {
      this.catalogoService.insertar(catalogo).subscribe(() => {
        alert('Catálogo registrado correctamente');
        this.router.navigate(['/catalogospromociones']); // <- redirección aquí
      });
    }
  }


}
