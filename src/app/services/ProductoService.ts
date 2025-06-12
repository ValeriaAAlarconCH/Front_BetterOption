import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Producto} from '../models/producto';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Producto[]> = new Subject<Producto[]>();

  constructor() { }
  list():Observable<any> {
    return this.httpClient.get<Producto[]>(this.url+"/productos/listar")
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "/productos/listarid/"+ id);
    return this.httpClient.get<Producto>(this.url+"/productos/listarid/"+id);
  }
  insert(producto:Producto){
    console.log(producto);
    return this.httpClient.post(this.url+"/productos/registrar", producto)
  }

  update(producto: Producto): Observable<any>{
    return this.httpClient.put(this.url + "/productos/actualizar", producto);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "/productos/eliminar/" + id);
  }
  setList(listaNueva: Producto[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Producto[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }

}
