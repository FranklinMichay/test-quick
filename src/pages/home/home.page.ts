import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalController, AlertController, Platform } from "@ionic/angular";
import * as moment_ from "moment";
import { Ionic4DatepickerModalComponent } from "@logisticinfotech/ionic4-datepicker";
const moment = moment_;
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";

export class MyTemplateDriverForm {
  public name: string;
  public email: string;
  public date: string;
}

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  mydate = "11-12-2018";

  datePickerObj: any = {};
  datePickerObjPtBr: any = {};
  mydatePtBr = "06 Fev 2019";

  isDisableDatePicker: false;
  monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  weeksList = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  selectedDate;
  clickSub: any;
  pickupLocation: string;

  location: any;

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    private localNotifications: LocalNotifications,
    public alertController: AlertController,
    public platform: Platform,
    private route: ActivatedRoute
  ) {

    

    this.route.queryParams.subscribe(params => {
      console.log(params, 'params');
      
      if (this.router.getCurrentNavigation().extras.state) {
        this.pickupLocation = this.router.getCurrentNavigation().extras.state.pickupLocation;
      }
    });
    console.log(this.location, "pickup");
  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: "Alert",
      message: data,
      buttons: ["OK"]
    });

    await alert.present();
  }

  unsub() {
    this.clickSub.unsubscribe();
  }

  simpleNotif() {
    this.clickSub = this.localNotifications.on("click").subscribe(data => {
      console.log(data);
      this.presentAlert(
        "Your notifiations contains a secret = " + data.data.secret
      );
      this.unsub();
    });

    this.localNotifications.schedule({
      id: 1,
      text: "Nueva Notificación",
      sound: this.setSound(),
      icon: "file://assets/icon/favicon.png",
      data: { secret: "secret" }
    });
  }

  //var sound = device.platform != 'iOS' ? 'file://audio/adhan.mp3' : 'content://audio/adhan.mp3';

  setSound() {
    if (this.platform.is("android")) {
      return "file://assets/sound/sound.mp3";
    } else {
      return "file://assets/sound/sorted.m4r";
    }
  }

  ngOnInit() {
    this.location = this.router.getCurrentNavigation().extras.state;
    console.log(this.location, "pickup");
  }

  goFunction() {
    this.router.navigate(["test-function"]);
  }

  onpickupClick() {
    this.router.navigate(["map"]);
  }
}
