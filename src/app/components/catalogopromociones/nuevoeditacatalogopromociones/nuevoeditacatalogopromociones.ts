import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {CatalogoPromocionesService} from '../../../services/CatalogoPromocionesService';
import {CatalogoPromociones} from '../../../models/catalogopromociones';
import {MicroempresaService} from '../../../services/MicroempresaService';
import {Microempresa} from '../../../models/microempresa';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';

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
    MatSelectModule,
    MatCardModule,
    MatIconModule,
  ]
})
export class NuevoEditaCatalogoPromociones implements OnInit {
  form: FormGroup;
  idCatalogo: number = 0;
  listaMicroempresas: Microempresa[] = [];

  private fb = inject(FormBuilder);
  private catalogoService = inject(CatalogoPromocionesService);
  private microService = inject(MicroempresaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.form = this.fb.group({
      id_catalogopromociones: [0],
      nombreCatalogo: ['', Validators.required],
      descripcion: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      microempresadto: [null, Validators.required]
    });

    this.microService.list().subscribe(data => this.listaMicroempresas = data);

    this.route.params.subscribe(params => {
      this.idCatalogo = params['id'];
      if (this.idCatalogo) {
        this.catalogoService.listId(this.idCatalogo).subscribe(data => {
          this.form.patchValue({
            ...data,
            microempresadto: data.microempresadto
          });
        });
      }
    });
  }

  guardar(): void {
    if (this.form.valid) {
      const catalogo: CatalogoPromociones = this.form.value;

      const accion = this.idCatalogo > 0
        ? this.catalogoService.update(catalogo)
        : this.catalogoService.insert(catalogo);

      accion.subscribe(() => {
        alert(this.idCatalogo > 0 ? 'Catálogo actualizado' : 'Catálogo registrado');
        this.router.navigate(['/catalogospromociones']);
      });
    } else {
      alert('Completa todos los campos.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/catalogospromociones']);
  }
}
