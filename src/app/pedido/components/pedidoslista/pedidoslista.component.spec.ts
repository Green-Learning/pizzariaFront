import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoslistaComponent } from './pedidoslista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoService } from '../../service/pedido.service';
import { of } from 'rxjs';
import { Pedido } from '../../pedido';

describe('PedidoslistaComponent', () => {
  let component: PedidoslistaComponent;
  let fixture: ComponentFixture<PedidoslistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockPedidoService: jasmine.SpyObj<PedidoService>

  beforeEach(() => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockPedidoService = jasmine.createSpyObj('PedidoService', ['listAll', 'deletar']);

    mockPedidoService.listAll.and.returnValue(of([])); 

    const pedidoMock: Pedido = new Pedido();

    mockPedidoService.deletar.and.returnValue(of('pedidoMock'));

    TestBed.configureTestingModule({
      declarations: [PedidoslistaComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: PedidoService, useValue: mockPedidoService }
      ]
    });
    fixture = TestBed.createComponent(PedidoslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do ClienteService na inicialização', () => {
    expect(mockPedidoService.listAll).toHaveBeenCalled();
  });

  it('deve chamar delete do ClienteService em deletar', () => {
    const pedido = new Pedido();
    pedido.id = 1;
    component.deletar(pedido);
    expect(mockPedidoService.deletar).toHaveBeenCalledWith(1);
  });


});
