import { Component, AfterViewInit, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { FirestoreService } from '../../service/statistic/firestore/firestore.service';
import { BranchList } from '../product/product.component';
import { BranchService } from '../../service/branch/branch.service';
declare var require: any;

const data: any = require('./data.json');

export interface Chart {
	type: ChartType;
	data: Chartist.IChartistData;
	options?: any;
	responsiveOptions?: any;
	events?: ChartEvent;
}

@Component({
	selector: 'app-statistics',
	templateUrl: './statistics.component.html',
	styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  public barChart1: Chart;
  public donuteChart1: Chart;

  public visits = [];
  public visitsGraph = {};
  public showGraphs = false;
  branches: BranchList[];
  public selectedBranch;

  constructor(
    private firestoreService: FirestoreService,
    private _branchService: BranchService
  ) {}



  showStatisticsByBranchId() {
    this.firestoreService.getViews(this.selectedBranch.id).subscribe(
      (visitsSnapshot) => {
        this.visits = [];
        visitsSnapshot.forEach((visitData: any) => {
          this.visits.push({
            id: visitData.payload.doc.id,
            data: visitData.payload.doc.data()
          });
        });
        console.log('visits: ', this.visits);
        this.convertToChartData();
        this.fillGraphs(this.visitsGraph);
      });
  }

  convertToChartData() {
    this.visits.sort((e1: any, e2: any) => {
      return e2.data.visits - e1.data.visits;
    }).slice(0, 5);

    this.visitsGraph = {
      'labels': [],
      'series': [[]]
    };

    this.visits.forEach((visitData: any) => {
      this.visitsGraph['labels'].push(visitData.id);
      this.visitsGraph['series'][0].push(visitData.data.visits);
    });
  }

  getStatisticsFromBranch(obj) {

    console.log('$event', obj.value);
    this.selectedBranch = obj.value;
    this.showStatisticsByBranchId();

  }

  getBranchesByCompanyId(id){
    this._branchService.getBranchNamesByCompanyId(id).subscribe(
      data => {
        this.branches = data;
        console.log('data: ', data);
      }
    );
  }

  ngOnInit() {
    const id = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));
    this.getBranchesByCompanyId(id);
  }

  fillGraphs(visits) {
    // Barchart
    this.barChart1 = {
      type: 'Bar',
      data: visits,
      options: {
        seriesBarDistance: 15,
        high: 12,

        axisX: {
          showGrid: false,
          offset: 20
        },
        axisY: {
          showGrid: true,
          offset: 40
        },
        height: 360
      },

      responsiveOptions: [
        [
          'screen and (min-width: 640px)',
          {
            axisX: {
                labelInterpolationFnc: function(
                value: number,
                index: number
            ): string {
              return index % 1 === 0 ? `${value}` : null;
              }
            }
          }
        ]
      ]
    };

    // This is for the donute chart
    this.donuteChart1 = {
      type: 'Pie',
      data: data['Pie'],
      options: {
        donut: true,
        height: 260,
        showLabel: false,
        donutWidth: 20
      }
    };
    this.showGraphs = true;
  }
}
