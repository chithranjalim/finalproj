import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipiesComponent } from './my-recipies.component';

describe('MyRecipiesComponent', () => {
  let component: MyRecipiesComponent;
  let fixture: ComponentFixture<MyRecipiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecipiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRecipiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
