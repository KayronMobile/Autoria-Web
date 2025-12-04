import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFrutas } from './form-frutas';

describe('FormFrutas', () => {
  let component: FormFrutas;
  let fixture: ComponentFixture<FormFrutas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFrutas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormFrutas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
