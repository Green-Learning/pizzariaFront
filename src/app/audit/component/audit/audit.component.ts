import { Component, Output, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Audit } from '../../audit';
import { AuditService } from '../../service/audit.service';

@Component({
  selector: 'app-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent {
  listaAuditoriaOriginal: Audit[] = [];
  listaAuditoriaFiltrada: Audit[] = [];

  auditoriaService = inject(AuditService);
  modalService = inject(NgbModal);

  auditDetalhes!: Audit;
  indice!: number;
  filterAcao!: string;
  filterObjeito!: string;

  constructor() {
    this.listarAudits();
  }

  listarAudits() {
    this.auditoriaService.listar().subscribe({
      next: lista => {
        this.listaAuditoriaOriginal = lista;
        console.log(this.listaAuditoriaOriginal);
        this.listaAuditoriaFiltrada = lista;
      }
    });
  }

  detalhes(modal: any, audit: Audit, indice: number) {
    this.auditDetalhes = Object.assign({}, audit);
    this.indice = indice;

    this.modalService.open(modal, { size: 'lg' });
  }

  @Output() realizarPesquisaPorAcao(filterAcao: string) {
    this.filterAcao = filterAcao;
    this.aplicarFiltros();
  }

  @Output() realizarPesquisaPorObjeito(filterObjeito: string) {
    this.filterObjeito = filterObjeito;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.listaAuditoriaFiltrada = this.listaAuditoriaOriginal.filter((auditoria: Audit) => {
      const alteracao = auditoria.dataHoraAlteracao;
      const criacao = auditoria.dataHoraCriacao;
      const excluicao = auditoria.dataHoraExclusao;

      const pedido = auditoria.pedido;
      const sabor = auditoria.sabor;
      const item = auditoria.item;

      let acaoValida = true;
      let objetoValido = true;

      // Filtrar por ação
      if (this.filterAcao) {
        if (this.filterAcao === 'criar') {
          acaoValida = criacao != null;
        } else if (this.filterAcao === 'alterar') {
          acaoValida = alteracao != null;
        } else if (this.filterAcao === 'excluir') {
          acaoValida = excluicao != null;
        }
      }

      // Filtrar por objeto
      if (this.filterObjeito) {
        if (this.filterObjeito === 'sabores') {
          objetoValido = sabor != null;
        } else if (this.filterObjeito === 'pedido') {
          objetoValido = pedido != null;
        } else if (this.filterObjeito === 'item') {
          objetoValido = item != null;
        }
      }

      return acaoValida && objetoValido;
    });
  }

  byId(item1: any, item2: any) {
    if (item1 != null && item2 != null) {
      return item1.id === item2.id;
    } else {
      return item1 === item2;
    }
  }
}
