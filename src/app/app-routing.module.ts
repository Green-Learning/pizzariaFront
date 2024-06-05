import { SaboreslistaComponent } from './sabor/components/saboreslista/saboreslista.component';
import { ItemslistaComponent } from './item/Components/itemslista/itemslista.component';
import { PedidoslistaComponent } from './pedido/components/pedidoslista/pedidoslista.component';
import { PessoaslistaComponent } from './usuario/componets/pessoaslista/pessoaslista.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { FuncionariolistaComponent } from './funcionario/funcionariolista/funcionariolista.component';
import { CadastroComponent } from './sistema/cadastro/cadastro.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'cadastrar', component:CadastroComponent},
  {
    path:'admin', component:IndexComponent,children:[
      {path:'pessoas', component:PessoaslistaComponent},
      {path:'pedidos', component:PedidoslistaComponent},
      {path:'itens', component:ItemslistaComponent},
      {path:'sabores', component:SaboreslistaComponent},
      {path:'funcionarios', component:FuncionariolistaComponent}
    ], 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
