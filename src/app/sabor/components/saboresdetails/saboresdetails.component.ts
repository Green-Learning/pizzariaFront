import { Sabores } from './../../sabores';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SaborService } from '../../services/sabor.service';

@Component({
  selector: 'app-saboresdetails',
  templateUrl: './saboresdetails.component.html',
  styleUrls: ['./saboresdetails.component.scss']
})
export class SaboresdetailsComponent {

  @Input() sabor: Sabores = new Sabores();
  @Output() retorno = new EventEmitter<Sabores>;

  saborService = inject(SaborService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  saborSelecionadoParaEdicao: Sabores = new Sabores();
  indiceSelecionadoParaEdicao!: number;


  salvar(){
    this.saborService.verify(this.sabor).subscribe({
      next: item =>{
        this.retorno.emit(item);
      }
    })
  }

}
