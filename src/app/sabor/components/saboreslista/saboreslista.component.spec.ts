import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SaboreslistaComponent } from './saboreslista.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SaborService } from './../../services/sabor.service';
import { of } from 'rxjs';
import { Sabores } from './../../sabores';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('SaboreslistaComponent', () => {
  let component: SaboreslistaComponent;
  let fixture: ComponentFixture<SaboreslistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockSaborService: jasmine.SpyObj<SaborService>;

  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockSaborService = jasmine.createSpyObj('SaborService', ['listAll', 'deletar']);

    mockSaborService.listAll.and.returnValue(of([]));

    const saboresMock: Sabores = {
      id: 1,
      nome: 'MockSabor'
    };
    mockSaborService.deletar.and.returnValue(of(saboresMock));

    await TestBed.configureTestingModule({
      declarations: [SaboreslistaComponent],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: SaborService, useValue: mockSaborService }
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SaboreslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call listAll from SaborService on initialization', () => {
    expect(mockSaborService.listAll).toHaveBeenCalled();
  });

  it('should open the modal and reset saborSelecionadoParaEdicao in adicionar', () => {
    const mockModal = {} as NgbModalRef;
    mockModalService.open.and.returnValue(mockModal);

    component.adicionar(mockModal);

    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
    expect(component.saborSelecionadoParaEdicao).toEqual(new Sabores());
  });

  it('should set saborSelecionadoParaEdicao and open the modal in editar', () => {
    const mockModal = {} as NgbModalRef;
    const sabor: Sabores = {
      id: 1,
      nome: 'TestSabor'
    };
    const indice = 0;

    component.editar(mockModal, sabor, indice);

    expect(component.saborSelecionadoParaEdicao).toEqual(sabor);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
  });

  it('should call deletar from SaborService in deletar', fakeAsync(() => {
    const sabor: Sabores = {
      id: 1,
      nome: 'TestSabor'
    };

    component.deletar(sabor);
    tick();

    expect(mockSaborService.deletar).toHaveBeenCalledWith(1);
  }));

  it('should emit the selected sabor in lancamento', () => {
    const sabor: Sabores = {
      id: 1,
      nome: 'TestSabor'
    };

    spyOn(component.retorno, 'emit');
    component.lancamento(sabor);

    expect(component.retorno.emit).toHaveBeenCalledWith(sabor);
  });
});
