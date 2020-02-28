import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { ModalController, AlertController, Platform } from "@ionic/angular";
import * as moment_ from "moment";
import { Ionic4DatepickerModalComponent } from "@logisticinfotech/ionic4-datepicker";
const moment = moment_;
import { LocalNotifications } from "@ionic-native/local-notifications/ngx";
import { Push, PushObject, PushOptions } from "@ionic-native/push/ngx";

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
    private push: Push,
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

  pushNotification() {
    // to check if we have permission
    this.push.hasPermission().then((res: any) => {
      if (res.isEnabled) {
        console.log("We have permission to send push notifications");
      } else {
        console.log("We do not have permission to send push notifications");
      }
    });

    // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    this.push
      .createChannel({
        id: "testchannel1",
        description: "My first test channel",
        // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
        importance: 3
      })
      .then(() => console.log("Channel created"));

    // Delete a channel (Android O and above)
    this.push
      .deleteChannel("testchannel1")
      .then(() => console.log("Channel deleted"));

    // Return a list of currently configured channels
    this.push
      .listChannels()
      .then(channels => console.log("List of channels", channels));

    // to initialize push notifications

    const options: PushOptions = {
      android: {},
      ios: {
        alert: "true",
        badge: true,
        sound: "false"
      },
      windows: {},
      browser: {
        pushServiceURL: "http://push.api.phonegap.com/v1/push"
      }
    };

    const pushObject: PushObject = this.push.init(options);
    pushObject
      .on("notification")
      .subscribe((notification: any) =>
        console.log("Received a notification", notification)
      );
    pushObject
      .on("registration")
      .subscribe((registration: any) =>
        console.log("Device registered", registration)
      );
    pushObject
      .on("error")
      .subscribe(error => console.error("Error with Push plugin", error));
  }

  onpickupClick() {
    this.router.navigate(["map"]);
  }
}
