import { PessoaslistaComponent } from './usuario/componets/pessoaslista/pessoaslista.component';
import { PessoasdetailsComponent } from './usuario/componets/pessoasdetails/pessoasdetails.component';
import { EnderecosdetailsComponent } from './endereco/Components/enderecosdetails/enderecosdetails.component';
import { PedidoslistaComponent } from './pedido/components/pedidoslista/pedidoslista.component';
import { PedidosdetailsComponent } from './pedido/components/pedidosdetails/pedidosdetails.component';
import { ItemslistaComponent } from './item/Components/itemslista/itemslista.component';
import { ItemsdetailsComponent } from './item/Components/itemsdetails/itemsdetails.component';
import { SaboreslistaComponent } from './sabor/components/saboreslista/saboreslista.component';
import { SaboresdetailsComponent } from './sabor/components/saboresdetails/saboresdetails.component';


import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { HttpClientModule } from '@angular/common/http';
import { FuncionariolistaComponent } from './funcionario/funcionariolista/funcionariolista.component';
import { FuncionariodetailsComponent } from './funcionario/funcionariodetails/funcionariodetails/funcionariodetails.component';
import { EnderecolistaComponent } from './endereco/Components/enderecolista/enderecolista/enderecolista.component';
import { httpInterceptorProviders } from './interceptor/httpincerceptor.service';
import { CadastroComponent } from './sistema/cadastro/cadastro.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    IndexComponent,
    PessoaslistaComponent,
    PessoasdetailsComponent,
    EnderecosdetailsComponent,
    PedidoslistaComponent,
    PedidosdetailsComponent,
    ItemslistaComponent,
    ItemsdetailsComponent,
    SaboreslistaComponent,
    SaboresdetailsComponent,
    FuncionariolistaComponent,
    FuncionariodetailsComponent,
    EnderecolistaComponent,
    CadastroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
