import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EnderecoService } from 'src/app/endereco/Service/endereco.service';
import { Endereco } from 'src/app/endereco/endereco';

@Component({
  selector: 'app-enderecolista',
  templateUrl: './enderecolista.component.html',
  styleUrls: ['./enderecolista.component.scss']
})
export class EnderecolistaComponent {

  @Input() modoLancamento = false;
  @Output() enderecoRetorno = new EventEmitter<Endereco>();
 

  lista: Endereco[] = [];
  listaFiltrada: Endereco[] = [];
  
  modalService = inject(NgbModal);
  enderecoService = inject(EnderecoService);
  termoBusca: string = "";

  constructor() {
    this.listAll();
  }

  listAll() {
    this.enderecoService.list().subscribe({
      next: lista => {
        this.lista = lista;
        this.listaFiltrada  = lista;
        
      },
      error: error => {
        alert('Exemplo de tratamento de erro ou exception! Erro no console');
        console.error(error);
      }
    });
  }


  filtrar() {
    if(this.termoBusca.length > 2){
      this.listaFiltrada = [];
      for(let i =0;i < this.lista.length; i++){
        if(this.lista[i].rua.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ 
          this.listaFiltrada.push(this.lista[i]);
        }
      }
    }else{
      this.listaFiltrada = this.lista;
    }
  }

  lancamentoEndereco(endereco : Endereco){
    this.enderecoRetorno.emit(endereco);
  }


}
