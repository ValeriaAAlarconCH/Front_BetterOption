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
import {UsuarioService} from '../../../services/UsuarioService';
import {Categoria} from '../../../models/categoria';
import {Usuario} from '../../../models/usuario';

@Component({
  selector: 'app-nuevoeditausuario',
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
  templateUrl: './nuevoeditausuario.html',
  styleUrl: './nuevoeditausuario.css'
})
export class Nuevoeditausuario {
  usuarioForm : FormGroup;
  fb : FormBuilder = inject(FormBuilder)
  usuarioService = inject(UsuarioService);
  router = inject(Router);
  edicion : boolean = false;
  route : ActivatedRoute = inject(ActivatedRoute);
  id: number = 0;

  constructor() {
    this.usuarioForm = this.fb.group({
      id_usuario: [''],
      nombre : ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      fechaRegistro: ['', Validators.required],

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
      this.usuarioService.listId(this.id).subscribe((data:Usuario) => {
        console.log(data);
        this.usuarioForm.patchValue({
          nombre:data.nombre,
          correo:data.correo,
          password:data.password,
          rol:data.rol,
          fechaRegistro:data.fechaRegistro
        });
      })
    }
  }

  onSubmit(){
    if(this.usuarioForm.valid){
      const usuario : Usuario = new Usuario();
      usuario.id_usuario = this.id;
      usuario.nombre = this.usuarioForm.value.nombre;
      usuario.correo = this.usuarioForm.value.correo;
      usuario.password = this.usuarioForm.value.password;
      usuario.rol = this.usuarioForm.value.rol;
      usuario.fechaRegistro = this.usuarioForm.value.fechaRegistro;

      if(!this.edicion){
        console.log("Datos leidos del form:", usuario);
        this.usuarioService.insert(usuario).subscribe((data) => {
          console.log(data);
          this.usuarioService.actualizarLista();
          console.log("Lista Actualizada");
        });
      }else{
        console.log("Datos leidos del form:", usuario);
        this.usuarioService.update(usuario).subscribe((data) => {
          this.usuarioService.actualizarLista();
          console.log("Lista Actualizada", data);
        })
      }
      this.router.navigate(['usuarios']);
    }
    else{
      console.log("Formulario no valido");
    }
  }


}
