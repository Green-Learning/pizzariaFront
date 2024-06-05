import { Item } from './../../../item/item';
import { PedidoService } from './../../service/pedido.service';
import { Usuario } from './../../../usuario/usuario';
import { Pedido } from './../../pedido';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Funcionario } from 'src/app/funcionario/funcionario';
import { Endereco } from 'src/app/endereco/endereco';


@Component({
  selector: 'app-pedidosdetails',
  templateUrl: './pedidosdetails.component.html',
  styleUrls: ['./pedidosdetails.component.scss']
})
export class PedidosdetailsComponent {


  @Input() pedido: Pedido =  new Pedido();

  @Output() retorno = new EventEmitter<Pedido>();

  @Input() desabilitaCampo!: boolean;
  @Input() roleSelecionada!: string;
  @Input() mostrarBotoesRole!: boolean;

  @Input() rua: string = "";
  @Input() numCasa: number = 0;


  vincularCliente = false;

  pedidoService = inject(PedidoService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef

  pedidoSelecionadoParaEdicao: Pedido = new Pedido();
  indiceSelecionadoParaEdicao!: number;
  
  constructor(){

  }

  salvar() {
    this.pedidoService.verify(this.pedido).subscribe({
      next: usuario => {
        this.retorno.emit(usuario);
      },
      error: erro => {
        alert("Errro, olhar no console");
        console.log(erro);
      }
    });
  }

  deletar(item: Item, i:number) {
    this.pedido.item.splice(i,1);
  }


  retornoItemLista(item : Item){
    if(this.pedido.item == null){
        this.pedido.item = [];
    }

    this.pedido.item.push(item);
    this.modalRef.dismiss();
  }
  //abrir modal 1
  lancar(modal: any){
    this.modalRef = this.modalService.open(modal, {size: "lg"});
  }
  //abrir modal 2
  lancarUsuario(modal: any){
    this.modalRef = this.modalService.open(modal, {size: "lg"});
  }
  //abrir modal 3
  lancarFuncionario(modal: any){
    this.modalRef = this.modalService.open(modal, {size: "lg"});
  }
  //abrir modal 4
  lancarEndereco(modal: any){
    this.modalRef = this.modalService.open(modal, {size: "lg"});
  }
  
  receberUsuario(usuario : Usuario){
    this.pedido.usuario = usuario;
    this.modalRef.dismiss();
  }

  receberFuncionario(funcionario : Funcionario){
    this.pedido.funcionario = funcionario;
    this.modalRef.dismiss();
  }

  receberEndereco(endereco: Endereco){
    this.rua = endereco.rua;
    this.numCasa = endereco.numCasa;
  }

  


}
