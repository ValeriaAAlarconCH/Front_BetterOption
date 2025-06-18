import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogopromociones } from '../models/catalogopromociones';

@Injectable({
  providedIn: 'root'
})
export class CatalogoPromocionesService {

  private url: string = 'http://localhost:8080/catalogopromociones'; // Ajusta si es necesario

  constructor(private http: HttpClient) {}

  listar(): Observable<Catalogopromociones[]> {
    return this.http.get<Catalogopromociones[]>(this.url);
  }

  obtenerPorId(id: number): Observable<Catalogopromociones> {
    return this.http.get<Catalogopromociones>(`${this.url}/${id}`);
  }

  insertar(promo: Catalogopromociones): Observable<any> {
    return this.http.post(this.url, promo);
  }

  update(promo: Catalogopromociones): Observable<any> {
    return this.http.put(`${this.url}/${promo.id}`, promo);
  }
}
