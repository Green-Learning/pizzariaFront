import { Funcionario } from '../funcionario/funcionario';
import { Item } from './../item/item';
import { Usuario } from './../usuario/usuario';

export class Pedido {
  id!: number;
  nome!: string;
  observacao!: string;
  entrega: boolean = true;
  item!: Item[];
  usuario!: Usuario;
  funcionario!: Funcionario;
  valorTotal!: number;
}
