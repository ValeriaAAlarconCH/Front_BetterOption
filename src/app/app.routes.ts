import {Routes} from '@angular/router';
import {Principal} from './components/principal/principal';
import {Listarproducto} from './components/producto/listarproducto/listarproducto';
import {Nuevoeditaproducto} from './components/producto/nuevoeditaproducto/nuevoeditaproducto';
import {
  Listarcatalogopromociones
} from './components/catalogopromociones/listarcatalogopromociones/listarcatalogopromociones';
import {Listarwishlist} from './components/wishlist/listarwishlist/listarwishlist';
import {Nuevoeditacategoria} from './components/categoria/nuevoeditacategoria/nuevoeditacategoria';
import {Nuevoeditausuario} from './components/usuario/nuevoeditausuario/nuevoeditausuario';
import {Nuevoeditawishlist} from './components/wishlist/nuevoeditawishlist/nuevoeditawishlist';
import {
  NuevoeditarmicroempresaComponent
} from './components/microempresa/nuevoeditamicroempresa/nuevoeditamicroempresa';
import {ListarmicroempresaComponent} from './components/microempresa/listarmicroempresa/listarmicroempresa';
import {
  updatemicroempresacomponents
} from './components/microempresa/updatemicroempresacomponents/updatemicroempresacomponents';
import {Listarnotificacion} from './components/notificacion/listarnotificacion/listarnotificacion';
import {Nuevoeditanotificacion} from './components/notificacion/nuevoeditanotificacion/nuevoeditanotificacion';
import { Nuevoeditaproductocatalogo } from './components/productocatalogo/nuevoeditaproductocatalogo/nuevoeditaproductocatalogo';
import { ListarproductocatalogoComponent } from './components/productocatalogo/listarproductocatalogo/listarproductocatalogo';
import {
  NuevoEditaCatalogoPromociones
} from './components/catalogopromociones/nuevoeditacatalogopromociones/nuevoeditacatalogopromociones';
import {ListarcategoriaComponent} from './components/categoria/listarcategoria/listarcategoria';
import {ListarusuarioComponent} from './components/usuario/listarusuario/listarusuario';
import {UpdateusuarioComponent} from './components/usuario/updateusuario/updateusuario';
import {Agregarproducto} from './components/wishlist/nuevoeditawishlist/agregarproducto/agregarproducto';


export const routes: Routes = [
  { path: '', component: Principal },

  {path : 'productos', component: Listarproducto},
  {path : 'productos/registrar', component: Nuevoeditaproducto},
  { path: 'wishlist/:id/agregarproducto', component: Agregarproducto},
  { path: 'productos/actualizar/:id', component: Nuevoeditaproducto },

  {path : 'catalogospromociones', component: Listarcatalogopromociones},
  {path : 'catalogospromociones/registrar', component: NuevoEditaCatalogoPromociones},
  { path: 'catalogospromociones/registrar/:id', component: NuevoEditaCatalogoPromociones },

  { path: 'usuarios', component: ListarusuarioComponent },
  { path: 'usuarios/registrar', component: Nuevoeditausuario },
  { path: 'usuarios/actualizar/:id', component: UpdateusuarioComponent },

  {path : 'wishlists', component: Listarwishlist},
  {path : 'wishlists/registrar', component: Nuevoeditawishlist},
  {path: 'wishlist/actualizar/:id', component: Nuevoeditawishlist},

  { path: 'notificaciones', component: Listarnotificacion },
  { path: 'notificaciones/registrar', component: Nuevoeditanotificacion },

  { path: 'categorias', component: ListarcategoriaComponent },
  {path : 'categorias/registrar', component: Nuevoeditacategoria},
  {path : 'categorias/actualizar/:id', component: Nuevoeditacategoria},

  { path: 'microempresas', component: ListarmicroempresaComponent },
  { path: 'microempresas/listar', component: ListarmicroempresaComponent },
  { path: 'microempresas/registrar', component: NuevoeditarmicroempresaComponent },
  { path: 'microempresas/actualizar/:id', component: updatemicroempresacomponents },

  { path: 'productoscatalogos/registrar', component: Nuevoeditaproductocatalogo },
  { path: 'productoscatalogos/editar/:id', component: Nuevoeditaproductocatalogo },
  { path: 'productoscatalogos', component: ListarproductocatalogoComponent },

];
