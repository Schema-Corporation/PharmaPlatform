import { Component, AfterViewInit, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import ChartistTooltip from 'chartist-plugin-tooltips-updated';
import ChartistLabel from 'chartist-plugin-pointlabels'
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

export interface ChartData {
  labels: any;
  series: Array<number>;
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
  public visitsBranch: any[] = [];
  public visitsBranchPrior: any[] = [];
  public visitsBranchGraph: ChartData;
  public visitsGraph: {};
  public branchsGraph = {};
  public showGraphs = false;
  public showDonutChart = false;
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
        this.fillDonutChart();
        console.log('data: ', data);
      }
    );
  }

  ngOnInit() {
    const id = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));
    this.getBranchesByCompanyId(id);
  }

  fillDonutChart() {
    const myBranches = this.branches;
    var itemsProcessed = 0;
    myBranches.forEach(branch => {
      this.firestoreService.getViews(branch.id).subscribe(
        (visitsSnapshot) => {
          if (visitsSnapshot.length > 0) {
            var visitsInBranch = 0;
            visitsSnapshot.forEach((visitData: any) => {
              visitsInBranch = visitsInBranch + visitData.payload.doc.data().visits;
            });
            this.visitsBranch.push({
              id: branch.branchName,
              visits: visitsInBranch
            });

          }
          itemsProcessed = itemsProcessed + 1;
          if (itemsProcessed == myBranches.length) {
            this.myBranchesCallback();
          }
        });
    });
  }

  myBranchesCallback() {
    this.visitsBranch.sort((e1: any, e2: any) => {
      return e2.visits - e1.visits;
    })

    var sumOthers = 0;
    if (this.visitsBranch.length > 3) {
      for (var i = 3; i < this.visitsBranch.length ; i++) {
        sumOthers = sumOthers + this.visitsBranch[i].visits;
      }
    }
    console.log('sumOthers: ', sumOthers);
    for (var i = 0; i < 3; i++) {
      this.visitsBranchPrior.push(this.visitsBranch[i])
    }
    var lastItem = {
      id: 'Otros',
      visits: sumOthers
    }
    this.visitsBranchPrior.push(lastItem);

    this.convertToDonutChartData();
  }

  convertToDonutChartData() {
    var labels = [];
    var series = [];
    this.visitsBranchGraph = {labels: labels, series: series};
    console.log('this.visitsBranch 2: ', this.visitsBranch);
    this.visitsBranchPrior.forEach((visitsBranchPriorData: any) => {
      this.visitsBranchGraph.labels.push(visitsBranchPriorData.id);
      this.visitsBranchGraph.series.push(visitsBranchPriorData.visits);
    });

    // This is for the donute chart
    this.donuteChart1 = {
      type: 'Pie',
      data: this.visitsBranchGraph,
      options: {
        donut: true,
        height: 260,
        showLabel: false,
        donutWidth: 20
      }
    };

    this.showDonutChart = true;
  }

  fillGraphs(visits) {
    // Barchart
    this.barChart1 = {
      type: 'Bar',
      data: visits,
      options: {
        seriesBarDistance: 15,
        onlyInteger: true,
        plugins: [
          ChartistLabel({
            textAnchor: 'middle',
            labelOffset: {
              x: 0,
              y: -40
            },
            labelInterpolationFnc: function(value) {
              return value
            }
          }),
          ChartistTooltip({

          })
        ],
        axisX: {
          showGrid: false,
          offset: 20
        },
        axisY: {
          showGrid: true,
          showLabel: true,
          type: Chartist.AutoScaleAxis,
          high: 50,
          low: 0,
          scaleMinSpace: 20,
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


    this.showGraphs = true;
  }
}
