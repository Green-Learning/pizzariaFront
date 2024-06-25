import { Item } from "../item/item";
import { Pedido } from "../pedido/pedido";
import { Sabores } from "../sabor/sabores";

export class Audit {
    id!: number;
    pedido!: Pedido;
    item!: Item;
    sabor!: Sabores;
    userCriacao!: string;
    userAlteracao!: string;
    userExclusao!: string;
    dataHoraCriacao!: Date;
    dataHoraAlteracao!: Date;
    dataHoraExclusao!: Date;
}
