import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-system',
    templateUrl: './system.component.html',
    styleUrls: ['./system.component.scss']
  })


  export class SystemComponent implements AfterViewInit {

    constructor(
        private router: Router
        ){}
    ngAfterViewInit(){

    }
  }