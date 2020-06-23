import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BranchComponent } from "./branch/branch.component";
import { AddBranchComponent } from "./branch/add-branch/add-branch.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { EditProductComponent } from "./product/edit-product/edit-product.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { FullComponent } from './layouts/full/full.component'
import { ProfileComponent } from './profile/profile.component'


const systemRoutes: Routes = [
  {
  path: '',
  component: FullComponent,
  children: [
    { path: 'branch', component: BranchComponent },
    { path: 'add-branch', component: AddBranchComponent },
    { path: 'add-branch/:branchId', component: AddBranchComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product', component: ProductComponent },
    { path: 'edit-product/:stockId', component: EditProductComponent },
    { path: 'add-product/:branchId', component: AddProductComponent },
    { path: 'statistics', component: StatisticsComponent },
    {
      path: '',
      redirectTo: 'branch',
      pathMatch: 'full',
    },
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(systemRoutes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}
