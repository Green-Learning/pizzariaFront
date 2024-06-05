import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosdetailsComponent } from './enderecosdetails.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EnderecosdetailsComponent', () => {
  let component: EnderecosdetailsComponent;
  let fixture: ComponentFixture<EnderecosdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnderecosdetailsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(EnderecosdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the endereco when salvar() is called', () => {
    spyOn(component.retorno, 'emit'); // Spy on the emit method of the EventEmitter

    // Set some values to simulate user input
    component.endereco.rua = 'Rua Teste';
    component.endereco.numCasa = 123;

    component.salvar();

    // Verify that the emit method was called with the expected endereco
    expect(component.retorno.emit).toHaveBeenCalledWith(component.endereco);
  });
});
