import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestFunctionPage } from './test-function.page';

describe('TestFunctionPage', () => {
  let component: TestFunctionPage;
  let fixture: ComponentFixture<TestFunctionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestFunctionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestFunctionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
