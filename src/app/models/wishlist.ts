import {Usuario} from './usuario';
import {Producto} from './producto';

export class Wishlist {
  id_wishlist: number = 0;
  fechaAgregado: Date = new Date();
  usuariodto: Usuario = new Usuario();
  productosdto: Producto[] = [];
}
