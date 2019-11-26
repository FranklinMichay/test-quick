import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestFunctionPageRoutingModule } from './test-function-routing.module';

import { TestFunctionPage } from './test-function.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestFunctionPageRoutingModule
  ],
  declarations: [TestFunctionPage]
})
export class TestFunctionPageModule {}
