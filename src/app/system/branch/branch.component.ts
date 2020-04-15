import {Component, OnInit, ViewChild} from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

declare var require: any;

const data: any = require('./data.json');

export interface BranchData {
	id: number;
	name: string;
	address: string;
	schedule: string;
  }

@Component({
	selector: 'app-branch',
	templateUrl: './branch.component.html',
	styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit  {

	displayedColumns: string[] = ['name', 'address', 'schedule', 'status', 'star'];
  	dataSource: MatTableDataSource<BranchData>;

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	constructor() {
		const branches = data;

		// Assign the data to the data source for the table to render
		this.dataSource = new MatTableDataSource(branches);
	}

	ngOnInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}
	
}
