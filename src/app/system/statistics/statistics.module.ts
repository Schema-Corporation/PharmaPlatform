import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StatisticsComponent } from './statistics.component';
import { StatisticsRoutes } from './statistics.routing';
import { ChartistModule } from 'ng-chartist';

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(StatisticsRoutes)
  ],
  declarations: [StatisticsComponent]
})
export class StatisticsModule {}
