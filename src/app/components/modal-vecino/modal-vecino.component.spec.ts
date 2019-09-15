import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVecinoComponent } from './modal-vecino.component';

describe('ModalVecinoComponent', () => {
  let component: ModalVecinoComponent;
  let fixture: ComponentFixture<ModalVecinoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVecinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVecinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
