import { Routes } from '@angular/router';

import { BranchComponent } from './branch.component';

export const BranchRoutes: Routes = [{
  path: '',
  component: BranchComponent,
  children: [
    {
      path: 'add_branch',
      loadChildren: () => import('./add-branch/add-branch.module').then(m => m.AddBranchModule)
    }
  ]
}];
