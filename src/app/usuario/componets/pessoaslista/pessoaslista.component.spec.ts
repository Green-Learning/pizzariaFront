import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PessoaslistaComponent } from './pessoaslista.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from './../../services/usuario.service';
import { of } from 'rxjs';
import { Usuario } from './../../usuario';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PessoaslistaComponent', () => {
  let component: PessoaslistaComponent;
  let fixture: ComponentFixture<PessoaslistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockUsuarioService: jasmine.SpyObj<UsuarioService>;

  beforeEach(async () => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockUsuarioService = jasmine.createSpyObj('UsuarioService', ['list', 'deletar']);
   
    mockUsuarioService.list.and.returnValue(of([]));

    const usuarioMock: Usuario = {
      id: 1,
      nome: 'MockUser',
      telefone: '123456789',
      cpf: '123.456.789-01',
      enderecos: [],
      user: { id: 1, username: 'mockuser', role: 'ROLE_USER', token: 'a' }
    };
    mockUsuarioService.deletar.and.returnValue(of(usuarioMock));

    await TestBed.configureTestingModule({
      declarations: [PessoaslistaComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: UsuarioService, useValue: mockUsuarioService }
      ],
      
      
      imports: [HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PessoaslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call list from UsuarioService on initialization', () => {
    expect(mockUsuarioService.list).toHaveBeenCalled();
  });

  it('should open the modal and reset usuarioSelecionadoParaEdicao in adicionar', () => {
    const mockModal = {} as NgbModalRef;
    mockModalService.open.and.returnValue(mockModal);

    component.adicionar(mockModal);

    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
    expect(component.usuarioSelecionadoParaEdicao).toEqual(new Usuario());
  });

  it('should set usuarioSelecionadoParaEdicao and open the modal in editar', () => {
    const mockModal = {} as NgbModalRef;
    const usuario: Usuario = {
      id: 1,
      nome: 'TestUser',
      telefone: '987654321',
      cpf: '987.654.321-01',
      enderecos: [],
      user: { id: 1, username: 'testuser', role: 'ROLE_USER', token: 'b' }
    };
    const indice = 0;

    component.editar(mockModal, usuario, indice);

    expect(component.usuarioSelecionadoParaEdicao).toEqual(usuario);
    expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
  });

  it('should call deletar from UsuarioService in deletar', fakeAsync(() => {
    const usuario: Usuario = {
      id: 1,
      nome: 'TestUser',
      telefone: '987654321',
      cpf: '987.654.321-01',
      enderecos: [],
      user: { id: 1, username: 'testuser', role: 'ROLE_USER', token: 'b' }
    };

    component.deletar(usuario);
    tick();

    expect(mockUsuarioService.deletar).toHaveBeenCalledWith(1);
  }));
});
