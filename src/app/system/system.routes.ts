import { Routes } from '@angular/router';
import { SystemComponent } from './system.component';


import { BranchComponent } from "./branch/branch.component";
import { AddBranchComponent } from "./branch/add-branch/add-branch.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProductComponent } from "./product/product.component";
import { AddProductComponent } from "./product/add-product/add-product.component";
import { StatisticsComponent } from "./statistics/statistics.component";


const systemChildren: Routes = [
    { path: 'branch', component: BranchComponent },
    { path: 'addbranch', component: AddBranchComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'product', component: ProductComponent },
    { path: 'addproduct', component: AddProductComponent },
    { path: 'statistics', component: StatisticsComponent }
]

export const systemRoutes: Routes = [
    { path: 'system', component: SystemComponent, children: systemChildren}
]
