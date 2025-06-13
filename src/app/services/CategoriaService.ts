import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Producto} from '../models/producto';
import {Categoria} from '../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Categoria[]> = new Subject<Categoria[]>();

  constructor() { }
  list():Observable<any> {
    return this.httpClient.get<Categoria[]>(this.url+"/categorias/listar")
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "/categorias/listarid/"+ id);
    return this.httpClient.get<Categoria>(this.url+"/categorias/listarid/"+id);
  }
  insert(categoria:Categoria){
    console.log(categoria);
    return this.httpClient.post(this.url+"/categorias/registrar", categoria)
  }

  update(categoria:Categoria): Observable<any>{
    return this.httpClient.put(this.url + "/categorias/actualizar", categoria);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "/categorias/eliminar/" + id);
  }
  setList(listaNueva: Categoria[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Categoria[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
