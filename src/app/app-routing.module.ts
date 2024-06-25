import { SaboreslistaComponent } from './sabor/components/saboreslista/saboreslista.component';
import { ItemslistaComponent } from './item/Components/itemslista/itemslista.component';
import { PedidoslistaComponent } from './pedido/components/pedidoslista/pedidoslista.component';
import { PessoaslistaComponent } from './usuario/componets/pessoaslista/pessoaslista.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { LoginComponent } from './sistema/login/login.component';
import { IndexComponent } from './components/layout/index/index.component';
import { FuncionariolistaComponent } from './funcionario/funcionariolista/funcionariolista.component';
import { CadastroComponent } from './sistema/cadastro/cadastro.component';
import { rotaguardGuard } from './guards/rotaguard.guard';
import { AuditComponent } from './audit/component/audit/audit.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  //{path:'login', component:LoginComponent},
  //{path:'cadastrar', component:CadastroComponent},
  {
    path:'', component:IndexComponent,children:[
      {path:'pessoas', component:PessoaslistaComponent,canActivate: [rotaguardGuard],data: {requiredRoles: ['admin']},},
      {path:'pedidos', component:PedidoslistaComponent,canActivate: [rotaguardGuard],data: {requiredRoles: ['admin']},},
      {path:'itens', component:ItemslistaComponent,canActivate: [rotaguardGuard],data: {requiredRoles: ['admin']},},
      {path:'sabores', component:SaboreslistaComponent,canActivate: [rotaguardGuard],data: {requiredRoles: ['admin']},},
      {path:'funcionarios', component:FuncionariolistaComponent,canActivate: [rotaguardGuard],data: {requiredRoles: ['admin']},},
      {path:'audit', component:AuditComponent,canActivate: [rotaguardGuard],data: {requiredRoles: ['admin']},}
    ], 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],//, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
