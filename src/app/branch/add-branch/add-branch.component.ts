import { Component, OnInit } from "@angular/core";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import { AgmCoreModule } from "@agm/core";
import PlaceResult = google.maps.places.PlaceResult;

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

  constructor() {}

  ngOnInit(): void {
    this.latitude = -12.119164;
    this.longitude = -77.029203;
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log("onAddressSelected: ", result);
  }

  onLocationSelected(location: Location) {
    console.log("onLocationSelected: ", location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
