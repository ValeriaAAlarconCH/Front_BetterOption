import {Microempresa} from './microempresa';
import {Categoria} from './categoria';

export class Producto {
  id_Producto: number;
  nombreProducto: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  microempresadto: Microempresa = new Microempresa();
  categoriadto: Categoria = new Categoria();
}
