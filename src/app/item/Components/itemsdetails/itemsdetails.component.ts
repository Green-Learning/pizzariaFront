import { ItemService } from './../../Service/item.service';
import { Sabores } from './../../../sabor/sabores';
import { Item } from './../../item';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-itemsdetails',
  templateUrl: './itemsdetails.component.html',
  styleUrls: ['./itemsdetails.component.scss']
})
export class ItemsdetailsComponent{

  @Input() item: Item = new Item();
  @Output() retorno = new EventEmitter<Item>();


  itemService = inject(ItemService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  itemSelecionadoParaEdicao: Item = new Item();
  indiciSelecionadoParaEdicao!: number;


  constructor(){
    this.item.possuiSabores = false;
  }

  salvar(){
    this.itemService.verify(this.item).subscribe({
      next: item =>{
        this.retorno.emit(item);
      }
    })
  }

  abrirModal(modal : any){
    this.modalRef = this.modalService.open(modal, {size:"lg"});
  }

  deletar(sabor : Sabores, i:number) {
    this.item.sabores.splice(i,1);
  }


  retornoSaboresLista(sabor: Sabores){
    if(this.item.sabores == null){
        this.item.sabores = [];
    }

    this.item.sabores.push(sabor);
    this.modalRef.dismiss();
  }

}
