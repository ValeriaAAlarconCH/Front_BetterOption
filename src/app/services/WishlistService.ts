import {inject, Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Wishlist} from '../models/wishlist';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private url = environment.apiURL;
  private httpClient: HttpClient = inject(HttpClient);
  private listaCambio: Subject<Wishlist[]> = new Subject<Wishlist[]>();

  constructor() { }
  list():Observable<any> {
    return this.httpClient.get<Wishlist[]>(this.url+"/wishlists/listar")
  }
  listId(id: number): Observable<any> {
    console.log(this.url + "/wishlists/listarid/"+ id);
    return this.httpClient.get<Wishlist>(this.url+"/wishlists/listarid/"+id);
  }
  insert(wishlist:Wishlist){
    console.log(wishlist);
    return this.httpClient.post(this.url+"/wishlists/registrar", wishlist)
  }

  agregarProducto(idWishlist: number, productoId: number): Observable<any> {
    return this.httpClient.post(`${this.url}/wishlists/${idWishlist}/agregarproducto/${productoId}`, {});
  }

  delete(id: number): Observable<any> {
    return this.httpClient.delete(`${this.url}/eliminar/${id}`);
  }

  setList(listaNueva: Wishlist[]) {
    this.listaCambio.next(listaNueva);
  }

  getListaCambio(): Observable<Wishlist[]> {
    return this.listaCambio.asObservable();
  }

  actualizarLista(): void {
    this.list().subscribe({
      next: data => this.setList(data),
      error: err => console.error('Error actualizando lista', err)
    });
  }

}
