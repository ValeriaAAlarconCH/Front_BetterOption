import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Usuario} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Usuario[]> = new Subject<Usuario[]>();

  constructor() { }
    list():Observable<any> {
      return this.httpClient.get<Usuario[]>(this.url+"/usuarios")
    }
  listId(id: number): Observable<any> {
    console.log(this.url + "/usuario/"+ id);
    return this.httpClient.get<Usuario>(this.url+"/usuario/"+id);
  }
  insert(usuario:Usuario){
    console.log(usuario);
    return this.httpClient.post(this.url+"/usuario", usuario)
  }

  update(usuario:Usuario): Observable<any>{
    return this.httpClient.put(this.url + "/usuario", usuario);
  }
  delete(id: number): Observable<any>{
    return this.httpClient.delete(this.url + "/usuario/" + id);
  }
  setList(listaNueva: Usuario[]) {
    this.listaCambio.next(listaNueva); //envia la nueva lista a los suscriptores
  }
  getListaCambio(): Observable<Usuario[]>{
    return this.listaCambio.asObservable();
  }
  actualizarLista(): void {
    this.list().subscribe({
      next: (data) => this.setList(data), //envia la nueva lista a los suscriptores
      error: (err) => console.error('Error actualizando lista', err)
    });
  }

}
