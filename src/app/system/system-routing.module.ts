import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BranchComponent } from "./branch/branch.component";
import { AddBranchComponent } from "./branch/add-branch/add-branch.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { StatisticsComponent } from "./statistics/statistics.component";

const systemRoutes: Routes = [
  { path: "", redirectTo: "branch", pathMatch: "full" },
  { path: "branch", component: BranchComponent },
  { path: "addbranch", component: AddBranchComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "product", component: ProductComponent },
  { path: "addproduct", component: AddProductComponent },
  { path: "statistics", component: StatisticsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(systemRoutes)],
  exports: [RouterModule],
})
export class SystemRoutingModule {}