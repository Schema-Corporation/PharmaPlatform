import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthService } from "./utils/auth";

/*const publicRoutes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
];*/

export const mainRoutes: Routes = [
  {
    path: "system",
    loadChildren: () =>
      import("./system/system.module").then((module) => module.SystemModule),
      canActivate: [AuthService],
  },
  {
    path: "public",
    loadChildren: () =>
      import("./public/public.module").then((module) => module.PublicModule),
  },
  { path: "", redirectTo: "public/login", pathMatch: "full" },
  { path: "**", redirectTo: "public/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(mainRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
