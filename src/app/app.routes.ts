import {Routes} from '@angular/router';
import {Principal} from './components/principal/principal';
import {Listarproducto} from './components/producto/listarproducto/listarproducto';
import {Nuevoeditaproducto} from './components/producto/nuevoeditaproducto/nuevoeditaproducto';
import {
  Listarcatalogopromociones
} from './components/catalogopromociones/listarcatalogopromociones/listarcatalogopromociones';
import {Listarusuario} from './components/usuario/listarusuario/listarusuario';
import {Listarwishlist} from './components/wishlist/listarwishlist/listarwishlist';
import {Nuevoeditacategoria} from './components/categoria/nuevoeditacategoria/nuevoeditacategoria';
import {Nuevoeditausuario} from './components/usuario/nuevoeditausuario/nuevoeditausuario';
import {Nuevoeditawishlist} from './components/wishlist/nuevoeditawishlist/nuevoeditawishlist';
import {NuevoeditarmicroempresaComponent} from './components/microempresa/nuevoeditamicroempresa/nuevoeditamicroempresa';
import { ListarmicroempresaComponent } from './components/microempresa/listarmicroempresa/listarmicroempresa';
import {
  updatemicroempresacomponents
} from './components/microempresa/updatemicroempresacomponents/updatemicroempresacomponents';
import {Listarnotificacion} from './components/notificacion/listarnotificacion/listarnotificacion';
import {Nuevoeditanotificacion} from './components/notificacion/nuevoeditanotificacion/nuevoeditanotificacion';
import {Listarproductocatalogo} from './components/productocatalogo/listarproductocatalogo/listarproductocatalogo';
import {
  Nuevoeditaproductocatalogo
} from './components/productocatalogo/nuevoeditaproductocatalogo/nuevoeditaproductocatalogo';
import {
  NuevoEditaCatalogoPromociones
} from './components/catalogopromociones/nuevoeditacatalogopromociones/nuevoeditacatalogopromociones';
import {ListarcategoriaComponent} from './components/categoria/listarcategoria/listarcategoria';
import {Agregarproducto} from './components/wishlist/nuevoeditawishlist/agregarproducto/agregarproducto';


export const routes: Routes = [
  {path : '', component: Principal},

  {path : 'productos', component: Listarproducto},
  {path : 'productos/registrar', component: Nuevoeditaproducto},
  { path: 'wishlist/:id/agregarproducto', component: Agregarproducto},

  {path : 'catalogospromociones', component: Listarcatalogopromociones},
  {path : 'catalogospromociones/registrar', component: NuevoEditaCatalogoPromociones},

  {path : 'usuarios', component: Listarusuario},
  {path : 'usuarios/registrar', component: Nuevoeditausuario},

  {path : 'wishlists', component: Listarwishlist},
  {path : 'wishlists/registrar', component: Nuevoeditawishlist},

  {path : 'notificaciones', component: Listarnotificacion},
  {path : 'notificaciones/registrar', component: Nuevoeditanotificacion},

  { path: 'categorias', component: ListarcategoriaComponent },
  {path : 'categorias/registrar', component: Nuevoeditacategoria},
  {path : 'categorias/actualizar/:id', component: Nuevoeditacategoria},

  { path: 'microempresas/registrar', component: NuevoeditarmicroempresaComponent },
  { path: 'microempresas', component: ListarmicroempresaComponent },
  { path: 'microempresas/listar', component: ListarmicroempresaComponent },
  { path: 'microempresas/actualizar/:id', component: updatemicroempresacomponents},

  {path : 'productoscatalogos', component: Listarproductocatalogo},
  {path : 'productoscatalogos/registrar', component: Nuevoeditaproductocatalogo},
]
