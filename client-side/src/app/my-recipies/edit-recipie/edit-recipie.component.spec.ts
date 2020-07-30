import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRecipieComponent } from './edit-recipie.component';

describe('EditRecipieComponent', () => {
  let component: EditRecipieComponent;
  let fixture: ComponentFixture<EditRecipieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRecipieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
