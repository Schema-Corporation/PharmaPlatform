import {Component, OnInit, ViewChild} from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BranchService } from "../../service/branch/branch.service";
import { NgxIndexedDBService } from 'ngx-indexed-db';

//declare var require: any;

//const data: any = require('./data.json');

export interface BranchData {
	id: number;
	name: string;
	addressName: string;
	schedule: string;
	status: string;
  }

@Component({
	selector: 'app-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit  {

	id: string;
	displayedColumns: string[] = ['id', 'name', 'addressName', 'schedule', 'status', 'star'];
  	dataSource: MatTableDataSource<BranchData>;



	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	constructor(
    private _branchService: BranchService,
    private dbService: NgxIndexedDBService
		) {

		this.dataSource = new MatTableDataSource([]);

		// Assign the data to the data source for the table to render
	}

	ngOnInit() {

    this.dbService.getByIndex('variables', 'name', 'token').then(
      token => {
        this.dbService.getByIndex('variables', 'name', 'companyId').then(
          companyId => {
            this._branchService.getBranchesByIdIndexDB(companyId.value, token.value, companyId.value).subscribe(
              data => {
                const branches = data;
                this.dataSource = new MatTableDataSource(branches);
              }
            );
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          },
          error => {
              console.log(error);
          });
      },
      error => {
          console.log(error);
      });



	}

	omitSpecialCharacter(event){
		var k;
		k = event.charCode;
		return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 225 || k==233 || k==237 || k==243 || k==250 || k == 32 || (k >= 48 && k <= 57));
	 }

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

}
