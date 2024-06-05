import { Login } from "../sistema/login/login";

export class Funcionario {
    id!: number;
    nome!: string;
    telefone!: string;
    cpf!: string;
    login!: Login;
    roles!: string;
}
