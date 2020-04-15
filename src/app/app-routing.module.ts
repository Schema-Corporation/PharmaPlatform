import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { LoginComponent } from './public/login/login.component';

const publicRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }
];
export const mainRoutes: Routes = [
  { path: '', redirectTo: 'public', pathMatch: 'full' },
  { path: 'public', component: PublicComponent, children: publicRoutes }
]

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
