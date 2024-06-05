import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecolistaComponent } from './enderecolista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoService } from 'src/app/endereco/Service/endereco.service';
import { of } from 'rxjs';
import { Endereco } from 'src/app/endereco/endereco';

describe('EnderecolistaComponent', () => {
  let component: EnderecolistaComponent;
  let fixture: ComponentFixture<EnderecolistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockEnderecoService: jasmine.SpyObj<EnderecoService>

  beforeEach(() => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockEnderecoService = jasmine.createSpyObj('EnderecoService', ['list', 'deletar']);

    mockEnderecoService.list.and.returnValue(of([])); 

    const enderecoMock: Endereco = new Endereco();

    mockEnderecoService.deletar.and.returnValue(of('enderecoMock'));
    TestBed.configureTestingModule({
      declarations: [EnderecolistaComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: EnderecoService, useValue: mockEnderecoService }
      ]
    });
    fixture = TestBed.createComponent(EnderecolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do ClienteService na inicialização', () => {
    expect(mockEnderecoService.list).toHaveBeenCalled();
});


});
