import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { SaboresdetailsComponent } from './saboresdetails.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SaborService } from '../../services/sabor.service';
import { of } from 'rxjs';
import { Sabores } from './../../sabores';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('SaboresdetailsComponent', () => {
  let component: SaboresdetailsComponent;
  let fixture: ComponentFixture<SaboresdetailsComponent>;
  let mockModalService: jasmine.SpyObj<NgbModal>;
  let mockSaborService: jasmine.SpyObj<SaborService>;

  beforeEach(() => {
    mockModalService = jasmine.createSpyObj('NgbModal', ['open']);
    mockSaborService = jasmine.createSpyObj('SaborService', ['verify']);

    TestBed.configureTestingModule({
      declarations: [SaboresdetailsComponent],
      providers: [
        { provide: NgbModal, useValue: mockModalService },
        { provide: SaborService, useValue: mockSaborService }
      ],
      imports: [HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(SaboresdetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call saborService.verify and emit retorno on salvar', fakeAsync(() => {
    // Arrange
    const saborMock: Sabores = { id: 1, nome: 'Sabor Teste' };
    mockSaborService.verify.and.returnValue(of(saborMock));
    const emitSpy = spyOn(component.retorno, 'emit');

    // Act
    component.salvar();
    tick();

    // Assert
    expect(mockSaborService.verify).toHaveBeenCalledWith(component.sabor);
    expect(emitSpy).toHaveBeenCalledWith(saborMock);
  }));
});
