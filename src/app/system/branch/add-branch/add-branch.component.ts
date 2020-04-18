import { Component, OnInit } from "@angular/core";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { IBranch } from "../../../../common/types";
import { MySweetAlert } from "../../../../common/utils";

@Component({
  selector: "app-add-branch",
  templateUrl: "./add-branch.component.html",
  styleUrls: ["./add-branch.component.scss"],
})
export class AddBranchComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;

  public branch: IBranch;

  public isValidAddress: boolean = false;
  public isValidOpenTime: boolean = false;
  public isValidCloseTime: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.branch = {
      latitude: -12.119164,
      longitude: -77.029203,
    };
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.branch.address = result.formatted_address;
    //this.address = result.formatted_address;
    this.isValidAddress = true;
    console.log("Result: ", result);
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
    if (this.validBranch()) {
      MySweetAlert.showSuccess("La sucursal ha sido agregada con éxito");
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
}
