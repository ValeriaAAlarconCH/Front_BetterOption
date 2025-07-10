import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {CatalogoPromociones} from '../models/catalogopromociones';

@Injectable({
  providedIn: 'root'
})
export class CatalogoPromocionesService {
  private url = environment.apiURL;
  private httpClient = inject(HttpClient);
  private listaCambio = new Subject<CatalogoPromociones[]>();

  list(): Observable<CatalogoPromociones[]> {
    return this.httpClient.get<CatalogoPromociones[]>(`${this.url}/catalogospromociones/listar`);
  }

  listId(id: number): Observable<CatalogoPromociones> {
    return this.httpClient.get<CatalogoPromociones>(`${this.url}/catalogospromociones/listarid/${id}`);
  }

  insert(catalogo: CatalogoPromociones): Observable<any> {
    return this.httpClient.post(`${this.url}/catalogospromociones/registrar`, catalogo);
  }

  update(catalogo: CatalogoPromociones): Observable<any> {
    return this.httpClient.put(`${this.url}/catalogospromociones/actualizar`, catalogo);
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/catalogospromociones/eliminar/${id}`);
  }

  setList(lista: CatalogoPromociones[]) {
    this.listaCambio.next(lista);
  }

  getListaCambio(): Observable<CatalogoPromociones[]> {
    return this.listaCambio.asObservable();
  }

  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data),
      error: (err) => console.error('Error al actualizar la lista:', err)
    });
  }
}
