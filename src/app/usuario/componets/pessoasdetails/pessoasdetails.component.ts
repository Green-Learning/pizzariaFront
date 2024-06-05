import { Endereco } from './../../../endereco/endereco';
import { Usuario } from './../../usuario';
import { UsuarioService } from './../../services/usuario.service';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Roles } from '../../roles';

@Component({
  selector: 'app-pessoasdetails',
  templateUrl: './pessoasdetails.component.html',
  styleUrls: ['./pessoasdetails.component.scss']
})
export class PessoasdetailsComponent {

  @Input() usuario: Usuario = new Usuario();
  @Output() retorno = new EventEmitter<Usuario>();


  usuarioService = inject(UsuarioService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  enderecoSelecionadoParaEdicao: Endereco = new Endereco();
  indiciSelecionadoParaEdicao!: number;


  salvar() {
    this.usuarioService.verify(this.usuario).subscribe({
      next: usuario => {
        this.retorno.emit(usuario);
      },
      error: erro => {
        alert("Erro, olhe no console");
        console.log(erro);
      }
    });
  }


  adicionarEndereco(modal: any) {
    this.enderecoSelecionadoParaEdicao = new Endereco();
    this.indiciSelecionadoParaEdicao = -1;
   this.modalRef = this.modalService.open(modal, { size: 'md' });
  }

  editarEndereco(modal: any, endereco: Endereco, indice: number) {
    this.enderecoSelecionadoParaEdicao = Object.assign({}, endereco);
    this.indiciSelecionadoParaEdicao = indice;
   this.modalRef = this.modalService.open(modal, { size: "md" });
  }

  deletar(endereco: Endereco, indice: number) {
    this.usuario.enderecos.splice(indice,1);
  }

  retornoEndereco(endereco: Endereco) {
    if (this.indiciSelecionadoParaEdicao >= 0) { //MODO EDITAR
      this.usuario.enderecos[this.indiciSelecionadoParaEdicao] = endereco;
    } else { //MODO ADICIONAR
      if (this.usuario.enderecos == null) {
        this.usuario.enderecos = [];
      }
      this.usuario.enderecos.push(Object.assign({}, endereco));
    }
    this.modalRef.dismiss();
  }
}
