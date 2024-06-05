import { Usuario } from './../../usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pessoaslista',
  templateUrl: './pessoaslista.component.html',
  styleUrls: ['./pessoaslista.component.scss']
})
export class PessoaslistaComponent {

  @Input() modoLancamento = false;
  @Output() usuarioRetorno = new EventEmitter<Usuario>();
 

  lista: Usuario[] = [];
  listaFiltrada: Usuario[] = [];
  

  roleSelecionada: string = "CLIENTE";
  mostrarBotoesRole: boolean = true;

  usuarioSelecionadoParaEdicao: Usuario = new Usuario();
  indiceSelecionadoParaEdicao!: number;

  modalService = inject(NgbModal);
  usuarioService = inject(UsuarioService);
  termoBusca: string = "";

  constructor() {
    this.listAll();
  }

  listAll() {
    this.usuarioService.list().subscribe({
      next: lista => {
        this.lista = lista;
        //this.listaFiltrada = Object.assign({}, lista);
        this.listaFiltrada  = lista;
        
      },
      error: error => {
        alert('Exemplo de tratamento de err/exception! Erro no console');
        console.error(error);
      }
    });
  }

  adicionar(modal: any) {
    this.usuarioSelecionadoParaEdicao = new Usuario();
    this.modalService.open(modal, { size: 'md' });
  }

  editar(modal:any, usuario: Usuario, indice: number) {
    this.usuarioSelecionadoParaEdicao = Object.assign({}, usuario);
    this.indiceSelecionadoParaEdicao = indice;
    this.modalService.open(modal, {size:"md"});
  }

  deletar(usuario : Usuario){
    this.usuarioService.deletar(usuario.id).subscribe(
      () =>{
        this.listAll();
      }
    )
  }

  addOuEditarPessoa(usuario: Usuario) {
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

  lancamentoUsuario(usuario : Usuario){
    this.usuarioRetorno.emit(usuario);
  }

}
