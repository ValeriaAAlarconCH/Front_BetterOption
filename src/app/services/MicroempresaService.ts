import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Microempresa} from '../models/microempresa';

@Injectable({
  providedIn: 'root'
})
export class MicroempresaService {
  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Microempresa[]> = new Subject<Microempresa[]>();

  constructor() { }
  list():Observable<any> {
    return this.httpClient.get<Microempresa[]>(this.url+"/microempresas/listar")
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "/microempresas/listarid/"+ id);
    return this.httpClient.get<Microempresa>(this.url+"/microempresas/listarid/"+id);
  }
  insert(microempresa:Microempresa){
    console.log(microempresa);
    return this.httpClient.post(this.url+"/microempresas/registrar", microempresa)
  }

  update(microempresa: any): Observable<any>{
    return this.httpClient.put(this.url + "/microempresas/actualizar", microempresa);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "/microempresas/eliminar/" + id);
  }
  setList(listaNueva: Microempresa[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Microempresa[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }
}
