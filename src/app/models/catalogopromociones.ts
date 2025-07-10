import {Microempresa} from './microempresa';

export class CatalogoPromociones {
  id_catalogopromociones: number;
  nombreCatalogo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  microempresadto: Microempresa = new Microempresa();
}
