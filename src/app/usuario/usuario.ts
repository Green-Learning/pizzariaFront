import { Login } from './../sistema/login/login';
import { Endereco } from './../endereco/endereco';
import { Roles } from './roles';
import { User } from '../sistema/login/user';

export class Usuario {
  id!: number;
  nome!: string;
  telefone!: string;
  cpf!: string;
  enderecos!: Endereco[];
  user!: User;

}
