import { Usuario } from './../usuario/usuario';

export class Endereco {

  id!: number;
  rua!: string;
  numCasa!: number;
  usuario!: Usuario;
  bairo!: string;
  cep!: string;
  complemento!: string;
}
