import {Routes} from '@angular/router';
import {Principal} from './components/principal/principal';
import {Listarproducto} from './components/producto/listarproducto/listarproducto';
import {Nuevoeditaproducto} from './components/producto/nuevoeditaproducto/nuevoeditaproducto';
import {
  Listarcatalogopromociones
} from './components/catalogopromociones/listarcatalogopromociones/listarcatalogopromociones';
import {Nuevoeditanotificacion} from './components/notificacion/nuevoeditanotificacion/nuevoeditanotificacion';
import {Listarnotificacion} from './components/notificacion/listarnotificacion/listarnotificacion';
import {Listarusuario} from './components/usuario/listarusuario/listarusuario';
import {Listarwishlist} from './components/wishlist/listarwishlist/listarwishlist';
import {Listarcategoria} from './components/categoria/listarcategoria/listarcategoria';
import {Nuevoeditacategoria} from './components/categoria/nuevoeditacategoria/nuevoeditacategoria';
import {Nuevoeditausuario} from './components/usuario/nuevoeditausuario/nuevoeditausuario';
import {Nuevoeditawishlist} from './components/wishlist/nuevoeditawishlist/nuevoeditawishlist';
import {NuevoeditarmicroempresaComponent} from './components/microempresa/nuevoeditamicroempresa/nuevoeditamicroempresa';
import { ListarmicroempresaComponent } from './components/microempresa/listarmicroempresa/listarmicroempresa';
import {updatemicroempresacomponents} from './components/microempresa/updatemicroempresacomponents/updatemicroempresacomponents';
import {Listarproductocatalogo} from './components/productocatalogo/listarproductocatalogo/listarproductocatalogo';
import {Nuevoeditaproductocatalogo} from './components/productocatalogo/nuevoeditaproductocatalogo/nuevoeditaproductocatalogo';


export const routes: Routes = [
  {path : '', component: Principal},

  {path : 'productos', component: Listarproducto},
  {path : 'productos/registrar', component: Nuevoeditaproducto},

  {path : 'catalogospromociones', component: Listarcatalogopromociones},
  //{path : 'catalogospromociones/registrar', component: Nuevoeditacatalogopromociones},

  {path : 'usuarios', component: Listarusuario},
  {path : 'usuarios/registrar', component: Nuevoeditausuario},

  {path : 'wishlists', component: Listarwishlist},
  {path : 'wishlists/registrar', component: Nuevoeditawishlist},

  {path : 'notificaciones', component: Listarnotificacion},
  {path : 'notificaciones/registrar', component: Nuevoeditanotificacion},
  { path: 'notificaciones/actualizar/:id', component: Nuevoeditanotificacion },


  {path : 'categorias', component: Listarcategoria},
  {path : 'categorias/registrar', component: Nuevoeditacategoria},

  { path: 'microempresas/registrar', component: NuevoeditarmicroempresaComponent },
  { path: 'microempresas', redirectTo: 'microempresas/registrar', pathMatch: 'full' },
  { path: 'microempresas/listar', component: ListarmicroempresaComponent },
  { path: 'microempresas/actualizar/:id', component: updatemicroempresacomponents},

  {path : 'productoscatalogos', component: Listarproductocatalogo},
  {path : 'productoscatalogos/registrar', component: Nuevoeditaproductocatalogo},
]
