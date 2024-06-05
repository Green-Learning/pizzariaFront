import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { ItemsdetailsComponent } from './itemsdetails.component';
import { ItemService } from './../../Service/item.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { of, throwError } from 'rxjs';
import { Sabores } from './../../../sabor/sabores';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Item } from './../../item';

describe('ItemsdetailsComponent', () => {
  let component: ItemsdetailsComponent;
  let fixture: ComponentFixture<ItemsdetailsComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockItemService: jasmine.SpyObj<ItemService>;

  beforeEach(() => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);
    mockItemService = jasmine.createSpyObj('ItemService', ['verify']);

    TestBed.configureTestingModule({
      declarations: [ItemsdetailsComponent],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: ItemService, useValue: mockItemService }
      ],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(ItemsdetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call itemService.verify and emit retorno on salvar', fakeAsync(() => {
    // Arrange
    const itemMock: Item = { id: 1, nome: 'Item Teste', tamanho: 'Tamanho Teste', valor: 10, possuiSabores: true, sabores: [] };
    mockItemService.verify.and.returnValue(of(itemMock));
    const emitSpy = spyOn(component.retorno, 'emit');

    // Act
    component.salvar();
    tick();

    // Assert
    expect(mockItemService.verify).toHaveBeenCalledWith(component.item);
    expect(emitSpy).toHaveBeenCalledWith(itemMock);
  }));

  // Adicione mais testes conforme necessário para cobrir outros métodos e cenários.

  it('should not delete sabores if index is out of bounds on deletar', () => {
    const saborMock: Sabores = { id: 1, nome: 'Sabor Teste' };
    component.item.sabores = [saborMock];

    component.deletar(saborMock, 1);

    expect(component.item.sabores.length).toBe(1);
  });

  it('should delete sabores on deletar', () => {
    const saborMock: Sabores = { id: 1, nome: 'Sabor Teste' };
    component.item.sabores = [saborMock];

    component.deletar(saborMock, 0);

    expect(component.item.sabores.length).toBe(0);
  });

  it('should open modal on abrirModal', () => {
    const mockModalRef: NgbModalRef = { close: jasmine.createSpy('close') } as any;
    mockModalService.open.and.returnValue(mockModalRef);

    component.abrirModal({});

    expect(mockModalService.open).toHaveBeenCalled();
  });


});
