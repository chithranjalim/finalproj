import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipieComponent } from './add-recipie.component';

describe('AddRecipieComponent', () => {
  let component: AddRecipieComponent;
  let fixture: ComponentFixture<AddRecipieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRecipieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
