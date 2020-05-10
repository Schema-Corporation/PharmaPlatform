import { Component, OnInit } from "@angular/core";
import {
  Appearance,
  Location,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { IBranch } from "../../../../common/types";
import { MySweetAlert } from "../../../../common/utils";
import { BranchService } from "../../../service/branch.service";
import { IAddBranch } from "../../../../common/types/addBranch";



@Component({
  selector: "app-add-branch",
  templateUrl: "./add-branch.component.html",
  styleUrls: ["./add-branch.component.scss"],
})
export class AddBranchComponent implements OnInit {
  public appearance = Appearance;
  public zoom: number;

  public branch: IBranch;
  public addbranch: IAddBranch;//addbranch con atributos iguales al del back

  public isValidAddress: boolean = false;
  public isValidOpenTime: boolean = false;
  public isValidCloseTime: boolean = false;
//para obtener el companyId, borrar luego
  public companyId: string;


  constructor(
    private _branchService: BranchService
  ) {}

  ngOnInit(): void {
    this.branch = {
      latitude: -12.119164,
      longitude: -77.029203,
    };
    this.addbranch = {
      latitude: 12.119164,
      longitude: 39.029203,
    };
    this.companyId = localStorage.getItem('companyId');
    //this.companyId = "2095d570-8cb6-4522-ab9d-3b68732f69f1";
    this.addbranch.companyId = this.companyId;
    //cityId 
    this.addbranch.cityId = "63b249ed-4a2b-4653-aef5-09ecb5482361";
    //name
    this.addbranch.name = "Test3";
    //insertar json
    //console.log('Branch: ', this.addbranch);
    //console.log('Branch JSON: ', JSON.stringify(this.addbranch));
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.branch.address = result.formatted_address;
    //this.address = result.formatted_address;
    this.isValidAddress = true;
    console.log("Result: ", result.formatted_address);
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
      this._branchService.saveBranch(this.addbranch).subscribe(
        data => {
          console.log('data', data);
        }
      );
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
