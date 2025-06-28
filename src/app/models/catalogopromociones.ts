export class CatalogoPromociones {
  id_catalogopromociones: number;
  nombreCatalogo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  microempresadto: {
    id_microempresa: number;
  };
}
