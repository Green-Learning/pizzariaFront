import { Sabores } from './../sabor/sabores';
export class Item {

  id!: number;
  tamanho!: string;
  nome!: string;
  sabores!: Sabores[];
  possuiSabores!: boolean;
  valor!: number;
}
