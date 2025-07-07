import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../../../services/UsuarioService';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-nuevoeditausuario',
  standalone: true,
  templateUrl: './nuevoeditausuario.html',
  styleUrls: ['./nuevoeditausuario.css'],
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class Nuevoeditausuario {
  usuarioForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  edicion: boolean = false;
  id: number = 0;

  constructor() {
    this.usuarioForm = this.fb.group({
      id_usuario: [''],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      fechaRegistro: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.cargarFormulario();
    });
  }

  cargarFormulario(): void {
    if (this.edicion) {
      this.usuarioService.listId(this.id).subscribe((data: Usuario) => {
        this.usuarioForm.patchValue({
          nombre: data.nombre,
          correo: data.correo,
          password: data.password,
          rol: data.rol,
          fechaRegistro: data.fechaRegistro
        });
      });
    }
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const usuario: Usuario = {
        id_usuario: this.id,
        nombre: this.usuarioForm.value.nombre,
        correo: this.usuarioForm.value.correo,
        password: this.usuarioForm.value.password,
        rol: this.usuarioForm.value.rol,
        fechaRegistro: this.usuarioForm.value.fechaRegistro
      };

      if (!this.edicion) {
        this.usuarioService.insert(usuario).subscribe(() => {
          this.usuarioService.actualizarLista();
        });
      } else {
        this.usuarioService.update(usuario).subscribe(() => {
          this.usuarioService.actualizarLista();
        });
      }

      this.router.navigate(['/usuarios']);
    } else {
      console.warn('Formulario inválido');
    }
  }
}
