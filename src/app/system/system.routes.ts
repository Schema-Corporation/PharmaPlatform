import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';


import { BranchComponent } from "./branch/branch.component";
import { AddBranchComponent } from "./branch/add-branch/add-branch.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { EditProductComponent } from './product/edit-product/edit-product.component';


const systemChildren: Routes = [
    { path: 'branch', component: BranchComponent },
    { path: 'add-branch/:branchId', component: AddBranchComponent },
    { path: 'add-branch', component: AddBranchComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product', component: ProductComponent },
    { path: 'edit-product/:stockId', component: EditProductComponent },
    { path: 'add-product/:branchId', component: AddProductComponent },
    { path: 'statistics', component: StatisticsComponent }
]

export const systemRoutes: Routes = [
    { path: 'system', component: SystemComponent, children: systemChildren}
]
