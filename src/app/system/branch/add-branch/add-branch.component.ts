import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { IBranch } from "../../../../common/types";
import { MySweetAlert } from "../../../../common/utils";
import { BranchService } from "../../../service/branch/branch.service";
import * as moment from 'moment'
import { Router, ActivatedRoute } from "@angular/router";


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

  public update: boolean = false;

  public isValidAddress: boolean = false;
  public isValidOpenTime: boolean = false;
  public isValidCloseTime: boolean = false;

  public changeUpdate: boolean = true;


  constructor(
    private _branchService: BranchService,
    private router: Router,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.branch = {
      latitude: -12.119164,
      longitude: -77.029203,
    };
    this.branch.companyId = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));

    if (this.route.snapshot.params.branchId) {
      const branchId = this.route.snapshot.params.branchId;
      this._branchService.viewBranch(branchId).subscribe(
        data => {
          this.update = true;
          this.branch = data;
          this.branch.companyId = JSON.parse(JSON.stringify(localStorage.getItem('companyId')));
          
          console.log('data', data);
        },
        error => {
          console.log('error: ', error);
        }
      );
    }
  }

  changeValues(){
    this.changeUpdate = false;
    console.log("changeUpdate: ", this.changeUpdate)
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.branch.address = result.formatted_address;
    //console.log("ADDRESS: ", result)
    this.changeUpdate = true;
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

  omitSpecialCharacter(event){   
   var k;  
   k = event.charCode; 
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 225 || k==233 || k==237 || k==243 || k==250 || k == 32 || (k >= 48 && k <= 57)); 
}

  validateCloseTime() {
    if (this.branch.closesAt) {
      this.isValidCloseTime = true;
    }
    return false;
  }

  saveBranch() {
    if (this.update) {
      this.updateBranch();
    } else {
      this.registerBranch();
    }
  }

  updateBranch() {
    this.infoBranch = JSON.parse(JSON.stringify(this.branch));
    this.processDateTime(this.infoBranch);
    console.log('infoBranch: ', this.infoBranch);
    if (this.changeUpdate){
      this._branchService.updateBranch(this.infoBranch).subscribe(
        data => {

          MySweetAlert.showSuccess("La sucursal ha sido modificada con éxito");

          this.router.navigateByUrl("/system/branch");
        }
      );
    } else {
      MySweetAlert.showError("Por favor, complete los campos correctamente");
    }
  }

  registerBranch() {
    // console.log("this.branch: ", this.branch);
    this.infoBranch = JSON.parse(JSON.stringify(this.branch));
    this.processDateTime(this.infoBranch);
    // console.log("this.infoBranch: ", this.infoBranch);

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
    this.branch.opensAt.replace("AM", "a.m.").replace("PM","p.m.");
    this.branch.closesAt.replace("AM", "a.m.").replace("PM","p.m.");
    var processedOpensAt = moment(this.branch.opensAt, 'h:mm a').format('HH:mm:ss');
    var processedClosesAt = moment(this.branch.closesAt, 'h:mm a').format('HH:mm:ss');
    infoBranch.opensAt = processedOpensAt;
    infoBranch.closesAt = processedClosesAt;
  }

}
