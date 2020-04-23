import { Component, AfterViewInit } from '@angular/core';

declare var require: any;

const data: any = require('./data.json');

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
	ngAfterViewInit() {}

	
}
