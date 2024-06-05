import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioService } from 'src/app/usuario/services/usuario.service';
import { Usuario } from 'src/app/usuario/usuario';
import { Funcionario } from '../funcionario';
import { FuncionarioService } from '../service/funcionario.service';

@Component({
  selector: 'app-funcionariolista',
  templateUrl: './funcionariolista.component.html',
  styleUrls: ['./funcionariolista.component.scss']
})
export class FuncionariolistaComponent {

  @Input() modoLancamento = false;
  @Output() funcionarioRetorno = new EventEmitter<Funcionario>();
 
  lista: Funcionario[] = [];
  listaFiltrada: Funcionario[] = [];
  
  roleSelecionada: string = "FUNCIONARIO";
  mostrarBotoesRole: boolean = true;

  funcionarioSelecionadoParaEdicao: Funcionario = new Funcionario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  funcionarioService = inject(FuncionarioService);
  termoBusca: string = "";

  constructor() {
    this.listAll();
  }

  listAll() {
    this.funcionarioService.list().subscribe({
      next: lista => {
        this.lista = lista;
        this.listaFiltrada  = lista;
        
      },
      error: error => {
        alert('Exemplo de tratamento de err/exception! Erro no console');
        console.error(error);
      }
    });
  }

  adicionar(modal: any) {
    this.funcionarioSelecionadoParaEdicao = new Funcionario();
    this.modalService.open(modal, { size: 'md' });
  }

  editar(modal:any, funcionario: Funcionario, indice: number) {
    this.funcionarioSelecionadoParaEdicao = Object.assign({}, funcionario);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"md"});
  }

  deletar(funcionario : Funcionario){
    this.funcionarioService.deletar(funcionario.id).subscribe(
      () =>{
        this.listAll();
      }
    )
  }

  addOuEditarFuncionario(funcionario: Funcionario) {
    this.listAll();
    this.modalService.dismissAll();

  }

  filtrar() {
    if(this.termoBusca.length > 2){
      this.listaFiltrada = [];
      for(let i =0;i < this.lista.length; i++){
        if(this.lista[i].nome.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >= 0){ 
          this.listaFiltrada.push(this.lista[i]);
        }
        if(this.lista[i].telefone.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >=0){
          this.listaFiltrada.push(this.lista[i]);
        }
        if(this.lista[i].cpf.toLowerCase().indexOf(this.termoBusca.toLowerCase()) >=0){
          this.listaFiltrada.push(this.lista[i]);
        }
      }
    }else{
      this.listaFiltrada = this.lista;
    }
  }

  alterarLista(role: string){
    this.roleSelecionada = role;
  }

  lancamentoFuncionario(funcionario : Funcionario){
    this.funcionarioRetorno.emit(funcionario);
  }

}
