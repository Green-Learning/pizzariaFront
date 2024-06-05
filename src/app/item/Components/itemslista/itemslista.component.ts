import { ItemService } from './../../Service/item.service';
import { Item } from './../../item';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { OutletContext } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-itemslista',
  templateUrl: './itemslista.component.html',
  styleUrls: ['./itemslista.component.scss']
})
export class ItemslistaComponent {

  lista:Item[]=[];
  listaFiltrada: Item[]=[];

  itemSelecionadoParaEdicao: Item = new Item();
  indiceSelecionadoParaEdicao!: number;

  @Output() retorno = new EventEmitter<Item>();
  @Input() modoLancamento: boolean = false;

  modalService = inject(NgbModal);
  itemService = inject(ItemService);
  termoBusca:string = "";

  constructor(){
    this.listAll();
  }


  listAll(){
    this.itemService.listAll().subscribe({
      next: lista =>{
        this.lista = lista;
        this.listaFiltrada = lista;
      },
      error: error =>{
        alert('Exemplo de tratamento de err/exception! Erro no console');
        console.error(error);
      }
    });
  }

  adicionar(modal: any) {
    this.itemSelecionadoParaEdicao = new Item();
    this.modalService.open(modal, { size: 'md' });
  }


  editar(modal:any, item: Item, indice: number) {
    this.itemSelecionadoParaEdicao = Object.assign({}, item);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"md"});
  }

  deletar(item: Item){
    this.itemService.deletar(item.id).subscribe({
      next: item =>{
        this.listAll();
      },
      error: erro =>{
        alert("nao e possivel deletar item associado a outrs registros");
      }
    });
  }

  addOuEditarPessoa(item: Item) {
    alert("Item cadastrado com sucesso");
    this.listAll();
    this.modalService.dismissAll();
  }

  filtrar() {
    if(this.termoBusca.length > 2){
      this.listaFiltrada = [];
      for(let i =0;i < this.lista.length; i++){
        for(let j =0; j < this.lista[i].sabores.length;i++){
          if(this.lista[i].sabores[i].nome.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ 
            this.listaFiltrada.push(this.lista[i]);
          }
        }

      }
    }else{
      this.listaFiltrada = this.lista;
    }
  }

  lancamento(item: Item){
    this.retorno.emit(item);
  }

}
