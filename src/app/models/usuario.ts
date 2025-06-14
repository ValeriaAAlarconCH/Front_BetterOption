export class Usuario {
  id_usuario:number;
  nombre: string;
  correo: string;
  password: string;
  rol: string;
  fechaRegistro:Date = new Date();
}
