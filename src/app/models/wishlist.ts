import {Usuario} from './usuario';
import {Producto} from './producto';

export class Wishlist {
  id_wishlist: number;
  fechaAgregado: Date = new Date();
  usuariodto: Usuario = new Usuario();
  productodto: Producto = new Producto();
}
