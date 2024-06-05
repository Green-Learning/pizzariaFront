import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoasdetailsComponent } from './pessoasdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PessoasdetailsComponent', () => {
  let component: PessoasdetailsComponent;
  let fixture: ComponentFixture<PessoasdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PessoasdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(PessoasdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
