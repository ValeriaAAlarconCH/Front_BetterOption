import {Usuario} from './usuario';

export class Microempresa {
  id_microempresa: number;
  nombreNegocio: string;
  rubro: string;
  dirección: string;
  teléfono: number;
  email: string;
  descripción: string;
  usuario: Usuario = new Usuario();
}
