import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FuncionariodetailsComponent } from './funcionariodetails.component';
import { FuncionarioService } from '../../service/funcionario.service';
import { of, throwError } from 'rxjs';
import { Funcionario } from '../../funcionario';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('FuncionariodetailsComponent', () => {
  let component: FuncionariodetailsComponent;
  let fixture: ComponentFixture<FuncionariodetailsComponent>;
  let mockFuncionarioService: jasmine.SpyObj<FuncionarioService>;

  beforeEach(() => {
    mockFuncionarioService = jasmine.createSpyObj('FuncionarioService', ['verify']);

    TestBed.configureTestingModule({
      declarations: [FuncionariodetailsComponent],
      providers: [
        { provide: FuncionarioService, useValue: mockFuncionarioService }
      ],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(FuncionariodetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call funcionarioService.verify and emit retorno on salvar', fakeAsync(() => {
    const funcionarioMock: Funcionario = { id: 1, nome: 'Funcionario Teste', telefone: '12345', cpf: '12345678901', roles: 'Funcionario', login: {username:'a', password:'b'} };
    mockFuncionarioService.verify.and.returnValue(of(funcionarioMock));
    const emitSpy = spyOn(component.retorno, 'emit');

    component.salvar();
    tick();

    expect(mockFuncionarioService.verify).toHaveBeenCalledWith(component.funcionario);
    expect(emitSpy).toHaveBeenCalledWith(funcionarioMock);
  }));

  it('should handle funcionarioService.verify error and not emit retorno on salvar', fakeAsync(() => {
    mockFuncionarioService.verify.and.returnValue(throwError('Erro no serviço'));
    const emitSpy = spyOn(component.retorno, 'emit');

    component.salvar();
    tick();

    expect(mockFuncionarioService.verify).toHaveBeenCalledWith(component.funcionario);
    expect(emitSpy).not.toHaveBeenCalled();
  }));
});
