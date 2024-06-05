import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemslistaComponent } from './itemslista.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ItemService } from '../../Service/item.service';
import { of } from 'rxjs';
import { Item } from '../../item';

describe('ItemslistaComponent', () => {
  let component: ItemslistaComponent;
  let fixture: ComponentFixture<ItemslistaComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockItemService: jasmine.SpyObj<ItemService>

  beforeEach(() => {

    mockModalService = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    mockItemService = jasmine.createSpyObj('ItemService', ['listAll', 'deletar']);

    mockItemService.listAll.and.returnValue(of([])); 

    const itemMock: Item = new Item();

    mockItemService.deletar.and.returnValue(of(itemMock));

    TestBed.configureTestingModule({
      declarations: [ItemslistaComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
      ],
      imports: [HttpClientTestingModule],
      providers: [
                { provide: NgbModal, useValue: mockModalService },
                { provide: ItemService, useValue: mockItemService }
              ]
    });
    fixture = TestBed.createComponent(ItemslistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve chamar listAll do ClienteService na inicialização', () => {
        expect(mockItemService.listAll).toHaveBeenCalled();
    });

    it('deve abrir o modal e resetar o itemSelecionadoParaEdicao em adicionar', () => {
           const mockModal = {};
           component.adicionar(mockModal);
           expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
           expect(component.itemSelecionadoParaEdicao).toEqual(new Item());
         });
       
         it('deve configurar ClienteSelecionadoParaEdicao e abrir o modal em editar', () => {
           const mockModal = {};
           const item = new Item();
           item.id = 1;
       
         
           component.editar(mockModal, item, 0);
           expect(component.itemSelecionadoParaEdicao.id).toBe(1);
           expect(mockModalService.open).toHaveBeenCalledWith(mockModal, { size: 'md' });
         });
       
         it('deve chamar delete do ClienteService em deletar', () => {
           const item = new Item();
           item.id = 1;
           component.deletar(item);
           expect(mockItemService.deletar).toHaveBeenCalledWith(1);
         });

});
