import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  auth: boolean = false;
  constructor(public router: Router) {
    const url: string = window.location.href;
    console.log(url)
    if (url.includes("login") || url.includes("register")) {
      this.auth = true;
    }
  }
  ngOnInit(): void {
    console.log('asd')
  }
}
