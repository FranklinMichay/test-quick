import { Component, OnInit } from '@angular/core';
import { Info } from '../../shared/mock/no-metales'
import * as _ from 'lodash';    

@Component({
  selector: 'app-test-function',
  templateUrl: './test-function.page.html',
  styleUrls: ['./test-function.page.scss'],
})
export class TestFunctionPage implements OnInit {

  selected: any;
  info: any;
  param = '';
  elements: any;
  compuesto = '';
  valencias: any;
  valorValencia = '';
  result: any;

  families: any = [
    { name: '1' },
    { name: '2' },
    { name: '3' },
    { name: '4' }
  ];

  constructor() { }

  ngOnInit() {
    this.info = Info;
  }

  getInfoSelect() {
    
    console.log('Familia: ', this.param);
    if (this.param === '1') {
      this.elements = this.info.f1;
      this.valencias = this.info.valenciaF1

    } else if (this.param === '2') {
      this.elements = this.info.f2
      this.valencias = this.info.valenciaF2

    } else if (this.param === '3') {
      this.elements = this.info.f3
      this.valencias = this.info.valenciaF3

    } else if (this.param === '4') {
      this.elements = this.info.f4
      this.valencias = this.info.valenciaF4

    }
  }

  getInfoSelectElement() {
    console.log('elemento: ', this.compuesto);

  }

  getInfoSelectValencia() {
    console.log('valencia: ', this.valorValencia);
  }

  calcular() {
    this.result =  _.find(this.info.estructuraF1, { 'nameElement': this.compuesto, 'valencia': this.valorValencia});
    console.log('Funcion: ',this.result.name);
    this.families = [];
    this.elements = [];
    this.valencias = [];
    this.compuesto = '';
    this.param = '';
    this.valorValencia = '';

  }

}
