import { Routes } from '@angular/router';
import { ListaFrutas } from './Frutas/lista-frutas/lista-frutas';
import { FormFrutas } from './Frutas/form-frutas/form-frutas';
export const routes: Routes = [
  { path: '', component: ListaFrutas },
  { path: 'cadastro', component: FormFrutas },   
  { path: 'editar/:id', component: FormFrutas }

];
