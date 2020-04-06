import { Component, OnInit } from "@angular/core";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import { AgmCoreModule } from "@agm/core";
import PlaceResult = google.maps.places.PlaceResult;
import { FormsModule } from '@angular/forms';

@Component({
  selector: "app-add-branch",
  templateUrl: "./add-branch.component.html",
  styleUrls: ["./add-branch.component.scss"],
})
export class AddBranchComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public address: string;
  public branchOpensAt: string;
  public branchClosesAt: string;

  public isValidAddress: boolean = false;
  public isValidOpenTime: boolean = false;
  public isValidCloseTime: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.latitude = -12.119164;
    this.longitude = -77.029203;
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log("onAddressSelected: ", result);
    this.address = result.formatted_address;
    this.isValidAddress = true;
  }

  onLocationSelected(location: Location) {
    console.log("onLocationSelected: ", location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  validateOpenTime() {
    if (this.branchOpensAt) { return true; }
    return false;
  }

  validateCloseTime() {
    if (this.branchClosesAt) { return true; }
    return false;
  }

  registerBranch() {
    const branch = {
      address: this.address,
      longitude: this.longitude,
      latitude: this.latitude,
      opensAt: this.branchOpensAt,
      closesAt: this.branchClosesAt
    }

    if (this.validBranch()) {
      console.log('branch: ', branch);
    } else {
      
    }
  }

  validBranch(): boolean {
    if (this.isValidAddress &&
        this.isValidOpenTime &&
        this.isValidCloseTime) {
      return true;
    }
    return false;
  }
}