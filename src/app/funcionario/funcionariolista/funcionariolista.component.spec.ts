import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariolistaComponent } from './funcionariolista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FuncionarioService } from '../service/funcionario.service';
import { of } from 'rxjs';
import { Funcionario } from '../funcionario';

describe('FuncionariolistaComponent', () => {
  let component: FuncionariolistaComponent;
  let fixture: ComponentFixture<FuncionariolistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockFuncionarioService: jasmine.SpyObj<FuncionarioService>

  beforeEach(() => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockFuncionarioService = jasmine.createSpyObj('ItemService', ['list', 'deletar']);

    mockFuncionarioService.list.and.returnValue(of([])); 

    const funcionarioMock: Funcionario = new Funcionario();

    mockFuncionarioService.deletar.and.returnValue(of(funcionarioMock));

    TestBed.configureTestingModule({
      declarations: [FuncionariolistaComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: FuncionarioService, useValue: mockFuncionarioService }
      ]
    });
    fixture = TestBed.createComponent(FuncionariolistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do ClienteService na inicialização', () => {
    expect(mockFuncionarioService.list).toHaveBeenCalled();
});

it('deve abrir o modal e resetar o funcionarioSelecionado em adicionar', () => {
       const mockModal = {};
       component.adicionar(mockModal);
       expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
       expect(component.funcionarioSelecionadoParaEdicao).toEqual(new Funcionario());
     });
   
     it('deve configurar Funcionario e abrir o modal em editar', () => {
       const mockModal = {};
       const funcionario = new Funcionario();
       funcionario.id = 1;
   
     
       component.editar(mockModal, funcionario, 0);
       expect(component.funcionarioSelecionadoParaEdicao.id).toBe(1);
       expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
     });
   
     it('deve chamar delete do ClienteService em deletar', () => {
       const funcionario = new Funcionario();
       funcionario.id = 1;
       component.deletar(funcionario);
       expect(mockFuncionarioService.deletar).toHaveBeenCalledWith(1);
     });
});
