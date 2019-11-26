import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestFunctionPage } from './test-function.page';

const routes: Routes = [
  {
    path: '',
    component: TestFunctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestFunctionPageRoutingModule {}
