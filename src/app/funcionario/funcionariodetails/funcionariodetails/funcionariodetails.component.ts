import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Funcionario } from '../../funcionario';
import { FuncionarioService } from '../../service/funcionario.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-funcionariodetails',
  templateUrl: './funcionariodetails.component.html',
  styleUrls: ['./funcionariodetails.component.scss']
})
export class FuncionariodetailsComponent {

  @Input() funcionario: Funcionario = new Funcionario();
  @Output() retorno = new EventEmitter<Funcionario>();

  funcionarioService = inject(FuncionarioService);
  modalService = inject(NgbModal);
  modalRef!: NgbModalRef;

  indiciSelecionadoParaEdicao!: number;

  salvar(){
    this.funcionarioService.verify(this.funcionario).subscribe({
      next: funcionario => {
        this.retorno.emit(funcionario);
      },
      error: erro => {
        alert("Erro, olhe no console");
        console.log(erro);
      }
    });
  }

  

}
