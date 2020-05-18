import {Component, OnInit, ViewChild} from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { BranchService } from "../../service/branch/branch.service";

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

	displayedColumns: string[] = ['name', 'addressName', 'schedule', 'status', 'star'];
  	dataSource: MatTableDataSource<BranchData>;

	

	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;

	constructor(
		private _branchService: BranchService
		) {

		this.dataSource = new MatTableDataSource([]);
		
		// Assign the data to the data source for the table to render
	}

	ngOnInit() {
		var id = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));
		this._branchService.getBranchesById(id).subscribe(
			data => {
				const branches = data;
				this.dataSource = new MatTableDataSource(branches);
				
			}
		);
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
