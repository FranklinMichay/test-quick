import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import * as moment_ from 'moment';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
const moment = moment_;
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

export class MyTemplateDriverForm {
  public name: string;
  public email: string;
  public date: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage {

  mydate = '11-12-2018';

  datePickerObj: any = {};
  datePickerObjPtBr: any = {};
  mydatePtBr = '06 Fev 2019';

  isDisableDatePicker: false;
  monthsList = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  weeksList = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  selectedDate;
  clickSub: any;

  constructor(
    private router: Router,
    public modalCtrl: ModalController,
    private localNotifications: LocalNotifications,
    public alertController: AlertController
  ) {

  }

  async presentAlert(data) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: data,
      buttons: ['OK']
    });

    await alert.present();
  }

  unsub() {
    this.clickSub.unsubscribe();
  }
  simpleNotif() {
    this.clickSub = this.localNotifications.on('click').subscribe(data => {
      console.log(data);
      this.presentAlert('Your notifiations contains a secret = ' + data.data.secret);
      this.unsub();
    });
    this.localNotifications.schedule({
      id: 1,
      text: 'Single Local Notification',
      data: { secret: 'secret' }
    });

  }
  

  ngOnInit() {
    const disabledDates: Date[] = [
      new Date(1545911005644),
      new Date(),
      new Date(2018, 12, 12), // Months are 0-based, this is August, 10th.
      new Date('Wednesday, December 26, 2018'), // Works with any valid Date formats like long format
      new Date('12-14-2018') // Short format
    ];

    // EXAMPLE OBJECT
    this.datePickerObj = {
      // inputDate: new Date('12'), // If you want to set month in date-picker
      // inputDate: new Date('2018'), // If you want to set year in date-picker
      // inputDate: new Date('2018-12'), // If you want to set year & month in date-picker
      // inputDate: new Date('2018-12-01'), // If you want to set date in date-picker

      // inputDate: this.mydate,
      // dateFormat: 'yyyy-MM-DD',
      dateFormat: 'DD-MM-YYYY',
      fromDate: new Date('1500-01-01'), // default null
      // toDate: new Date('2018-12-28'), // default null
      // showTodayButton: true, // default true
      // closeOnSelect: false, // default false
      // disableWeekDays: [4], // default []
      // mondayFirst: false, // default false
      // setLabel: 'S',  // default 'Set'
      // todayLabel: 'T', // default 'Today'
      // closeLabel: 'C', // default 'Close'
      // disabledDates: disabledDates, // default []
      titleLabel: 'Select a Date', // default null
      // monthsList: this.monthsList,
      // weeksList: this.weeksList,
      // momentLocale: 'pt-BR',
      yearInAscending: true
    };

    this.datePickerObjPtBr = {
      dateFormat: 'DD MMM YYYY',
      closeOnSelect: true,
      setLabel: 'OK',
      todayLabel: 'Hoje',
      closeLabel: 'Fechar',
      titleLabel: 'Selecione uma data',
      monthsList: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      weeksList: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
      clearButton: false
      // momentLocale: 'pt-BR'
    };
  }

  goFunction() {
    this.router.navigate(['test-function']);
  }

  onChangeDate() {
    console.log('onChangeDate date ', this.mydate);
  }

  onClickSubmit() {
    // console.log('onClickSubmit', this.dataForm.value);
  }

  async openDatePicker() {
    const datePickerObj = {
      inputdate: moment(new Date('2019-02')),
      closeOnSelect: true,
      titleLabel: 'Datum',
      closeLabel: 'Schließen',
      monthsList: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
      ],
      showTodayButton: false,
      weeksList: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      dateFormat: 'DD.MM.YYYY',
      clearButton: true
    };

    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',
      componentProps: { objConfig: datePickerObj }
    });
    await datePickerModal.present();

    datePickerModal.onDidDismiss().then(data => {
      // this.isModalOpen = false;
      console.log(data);
      this.selectedDate = data.data.date;
    });
  }
}