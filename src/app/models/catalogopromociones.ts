export class CatalogoPromociones {
  id_catalogopromociones: number;
  nombreCatalogo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  microempresa: {
    id_microempresa: number;
    nombreNegocio: string;
  };
}
