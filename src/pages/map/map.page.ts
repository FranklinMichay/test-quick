import { Component, OnInit } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";
import { Map, tileLayer, marker, LatLng } from "leaflet";

import {
  NativeGeocoder,
  NativeGeocoderOptions
} from "@ionic-native/native-geocoder/ngx";

@Component({
  selector: "app-map",
  templateUrl: "./map.page.html",
  styleUrls: ["./map.page.scss"]
})
export class MapPage implements OnInit {
  map: Map;
  newMarker: any;
  address: string[];

  constructor(private router: Router, private geocoder: NativeGeocoder) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = new Map("mapId").setView([17.385, 78.4867], 13);
    tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }).addTo(this.map);
    
    // this.map.on("move", () => {
    //   console.log("Current Map Center:", this.map.getCenter().toString());
    //   this.newMarker = marker(this.map.getCenter(), {
    //     draggable: true
    //   }).addTo(this.map);
    // });
  }

  locatePosition() {
    this.map.locate({ setView: true }).on("locationfound", (e: any) => {
      this.newMarker = marker([e.latitude, e.longitude], {
        draggable: true
      }).addTo(this.map);

      this.newMarker.bindPopup("ESTAS AQUI").openPopup();
      this.getAddress(e.latitude, e.longitude); // This line is added

      this.newMarker.on("dragend", () => {
        const position = this.newMarker.getLatLng();
        this.getAddress(position.lat, position.lng); // This line is added
      });
    });

    
  }

  //The function below is added
  getAddress(lat: number, long: number) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };
    this.geocoder.reverseGeocode(lat, long, options).then(results => {
      this.address = Object.values(results[0]).reverse();
    });
  }
  // The function below is added
  confirmPickupLocation() {
    // let navigationextras: NavigationExtras = {
    //   state: {
    //     pickupLocation: this.address
    //   }
    // };
    console.log(this.address, 'adress');
    

    //this.router.navigate(["home"], { state: this.address });
    //this.router.navigate(["home"], navigationextras);
  }

  goBack() {
    this.router.navigate(["home"]);
  }
}
