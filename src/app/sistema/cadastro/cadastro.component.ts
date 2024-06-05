import { Component, inject } from '@angular/core';
import { Cadastro } from './cadastro';
import { Router } from '@angular/router';
import { CadastroServiceService } from './service/cadastro-service.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  cadastrar : Cadastro = new Cadastro();
  roteador = inject(Router);
  cadastroServiceService = inject(CadastroServiceService);

  constructor() {
    
  }

  cadastro(){

    this.cadastroServiceService.logar(this.cadastrar).subscribe({
      next: user => { // QUANDO DÁ CERTO
        console.log(this.cadastrar);
        this.roteador.navigate(['/login']);
      },
      error: erro => { // QUANDO DÁ ERRO
        alert('Exemplo de tratamento de erro/exception! Observe o erro no console!');
        console.error(erro);
      }
    });

  }

}
