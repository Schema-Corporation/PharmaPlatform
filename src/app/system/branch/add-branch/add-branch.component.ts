import { Component, OnInit } from "@angular/core";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { IBranch } from "../../../../common/types";
import { MySweetAlert } from "../../../../common/utils";
import { BranchService } from "../../../service/branch/branch.service";
import * as moment from 'moment'
import { Router } from "@angular/router";


@Component({
  selector: "app-add-branch",
  templateUrl: "./add-branch.component.html",
  styleUrls: ["./add-branch.component.scss"],
})
export class AddBranchComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;

  public branch: IBranch;
  public infoBranch: IBranch;

  public isValidAddress: boolean = false;
  public isValidOpenTime: boolean = false;
  public isValidCloseTime: boolean = false;



  constructor(
    private _branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.branch = {
      latitude: -12.119164,
      longitude: -77.029203,
    };
    this.branch.companyId = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.branch.address = result.formatted_address;
    this.isValidAddress = true;
    var address_components = result.address_components;
    for (var i in address_components) {
      for (var j in address_components[i].types) {
        if (address_components[i].types[j] == 'locality') {
          var district = address_components[i].long_name;
        }
      }
    }
    
    this.branch.districtName = district;
  }

  onLocationSelected(location: Location) {
    this.branch.latitude = location.latitude;
    this.branch.longitude = location.longitude;
  }

  validateOpenTime() {
    if (this.branch.opensAt) {
      this.isValidOpenTime = true;
    }
    
    return false;
  }

  validateCloseTime() {
    if (this.branch.closesAt) {
      this.isValidCloseTime = true;
    }
    return false;
  }

  registerBranch() {
    
    this.infoBranch = JSON.parse(JSON.stringify(this.branch));
    this.processDateTime(this.infoBranch);

    if (this.validBranch()) {
      this._branchService.saveBranch(this.infoBranch).subscribe(
        data => {
          //console.log('data', data);
          
          MySweetAlert.showSuccess("La sucursal ha sido agregada con éxito");
          
          this.router.navigateByUrl("/system/branch");
        }
      );
    } else {
      MySweetAlert.showError("Por favor, complete los campos obligatorios");
    }
  }

  validBranch(): boolean {
    if (this.isValidAddress && this.isValidOpenTime && this.isValidCloseTime) {
      return true;
    }
    return false;
  }

  processDateTime(infoBranch){
    var processedOpensAt = moment(this.branch.opensAt, 'h:mm a').format('HH:mm:ss');
    var processedClosesAt = moment(this.branch.closesAt, 'h:mm a').format('HH:mm:ss');
    infoBranch.opensAt = processedOpensAt;
    infoBranch.closesAt = processedClosesAt;
  }
  
}
