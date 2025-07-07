import { Routes } from '@angular/router';
import { Principal } from './components/principal/principal';

import { Listarproducto } from './components/producto/listarproducto/listarproducto';
import { Nuevoeditaproducto } from './components/producto/nuevoeditaproducto/nuevoeditaproducto';

import { Listarcatalogopromociones } from './components/catalogopromociones/listarcatalogopromociones/listarcatalogopromociones';
import { NuevoEditaCatalogoPromociones } from './components/catalogopromociones/nuevoeditacatalogopromociones/nuevoeditacatalogopromociones';

import { Listarusuario } from './components/usuario/listarusuario/listarusuario';
import { Nuevoeditausuario } from './components/usuario/nuevoeditausuario/nuevoeditausuario';

import { Listarwishlist } from './components/wishlist/listarwishlist/listarwishlist';
import { Nuevoeditawishlist } from './components/wishlist/nuevoeditawishlist/nuevoeditawishlist';

import { Listarnotificacion } from './components/notificacion/listarnotificacion/listarnotificacion';
import { Nuevoeditanotificacion } from './components/notificacion/nuevoeditanotificacion/nuevoeditanotificacion';

import { Listarcategoria } from './components/categoria/listarcategoria/listarcategoria';
import { Nuevoeditacategoria } from './components/categoria/nuevoeditacategoria/nuevoeditacategoria';

import { NuevoeditarmicroempresaComponent } from './components/microempresa/nuevoeditamicroempresa/nuevoeditamicroempresa';
import { ListarmicroempresaComponent } from './components/microempresa/listarmicroempresa/listarmicroempresa';
import { updatemicroempresacomponents } from './components/microempresa/updatemicroempresacomponents/updatemicroempresacomponents';


import { Nuevoeditaproductocatalogo } from './components/productocatalogo/nuevoeditaproductocatalogo/nuevoeditaproductocatalogo';
import { ListarproductocatalogoComponent } from './components/productocatalogo/listarproductocatalogo/listarproductocatalogo';


export const routes: Routes = [
  { path: '', component: Principal },

  { path: 'productos', component: Listarproducto },
  { path: 'productos/registrar', component: Nuevoeditaproducto },

  { path: 'catalogospromociones', component: Listarcatalogopromociones },
  { path: 'catalogospromociones/registrar', component: NuevoEditaCatalogoPromociones },

  { path: 'usuarios', component: Listarusuario },
  { path: 'usuarios/registrar', component: Nuevoeditausuario },

  { path: 'wishlists', component: Listarwishlist },
  { path: 'wishlists/registrar', component: Nuevoeditawishlist },

  { path: 'notificaciones', component: Listarnotificacion },
  { path: 'notificaciones/registrar', component: Nuevoeditanotificacion },

  { path: 'categorias', component: Listarcategoria },
  { path: 'categorias/registrar', component: Nuevoeditacategoria },

  { path: 'microempresas', component: ListarmicroempresaComponent },
  { path: 'microempresas/listar', component: ListarmicroempresaComponent },
  { path: 'microempresas/registrar', component: NuevoeditarmicroempresaComponent },
  { path: 'microempresas/actualizar/:id', component: updatemicroempresacomponents },


  { path: 'productoscatalogos/registrar', component: Nuevoeditaproductocatalogo },
  { path: 'productoscatalogos/editar/:id', component: Nuevoeditaproductocatalogo },
  { path: 'productoscatalogos', component: ListarproductocatalogoComponent },

];
