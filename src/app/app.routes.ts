import { Routes } from '@angular/router';
import { Principal } from './components/principal/principal';
import { Listarproducto } from './components/producto/listarproducto/listarproducto';
import { Nuevoeditaproducto } from './components/producto/nuevoeditaproducto/nuevoeditaproducto';
import { Listarcatalogopromociones } from './components/catalogopromociones/listarcatalogopromociones/listarcatalogopromociones';
import { ListarmicroempresaComponent } from './components/microempresa/listarmicroempresa/listarmicroempresa';
import { NuevoeditarmicroempresaComponent } from './components/microempresa/nuevoeditamicroempresa/nuevoeditamicroempresa';
import { Listarnotificacion } from './components/notificacion/listarnotificacion/listarnotificacion';
import { Listarusuario } from './components/usuario/listarusuario/listarusuario';
import { Nuevoeditausuario } from './components/usuario/nuevoeditausuario/nuevoeditausuario';
import { Listarwishlist } from './components/wishlist/listarwishlist/listarwishlist';
import { Nuevoeditawishlist } from './components/wishlist/nuevoeditawishlist/nuevoeditawishlist';
import { Listarcategoria } from './components/categoria/listarcategoria/listarcategoria';
import { Nuevoeditacategoria } from './components/categoria/nuevoeditacategoria/nuevoeditacategoria';

export const routes: Routes = [
  { path: '', component: Principal },

  { path: 'productos', component: Listarproducto },
  { path: 'productos/registrar', component: Nuevoeditaproducto },

  { path: 'microempresas', redirectTo: 'microempresas/registrar' }, // Redirige a registrar por defecto
  { path: 'microempresas/registrar', component: NuevoeditarmicroempresaComponent },
  { path: 'microempresas/listar', component: ListarmicroempresaComponent },

  { path: 'descuentos', component: Listarcatalogopromociones },

  { path: 'usuarios', component: Listarusuario },
  { path: 'usuarios/registrar', component: Nuevoeditausuario },

  { path: 'wishlists', component: Listarwishlist },
  { path: 'wishlists/registrar', component: Nuevoeditawishlist },

  { path: 'notificaciones', component: Listarnotificacion },

  { path: 'categorias', component: Listarcategoria },
  { path: 'categorias/registrar', component: Nuevoeditacategoria },
];
