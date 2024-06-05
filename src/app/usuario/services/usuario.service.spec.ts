import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsuarioService } from './usuario.service';
import { Usuario } from './../usuario';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('UsuarioService', () => {
  let usuarioService: UsuarioService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsuarioService]
    });

    usuarioService = TestBed.inject(UsuarioService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(usuarioService).toBeTruthy();
  });

  it('should retrieve users from the API', () => {
    const mockUsuarios: Usuario[] = [
      { id: 1, nome: 'Usuario 1', telefone: '123456789', cpf: '123.456.789-01', enderecos: [], user: { id: 1, username: 'user1', role: 'ROLE_USER', token: 'a' } },
      { id: 2, nome: 'Usuario 2', telefone: '987654321', cpf: '987.654.321-02', enderecos: [], user: { id: 2, username: 'user2', role: 'ROLE_ADMIN', token: 'b' } },
    ];

    usuarioService.list().subscribe(usuarios => {
      expect(usuarios.length).toBe(2);
      expect(usuarios).toEqual(mockUsuarios);
    });

    const req = httpTestingController.expectOne('http://localhost:8080/api/usuario');
    expect(req.request.method).toEqual('GET');

    req.flush(mockUsuarios);
  });

  it('should delete a user by id', () => {
    const userId = 1;

    usuarioService.deletar(userId).subscribe(user => {
      expect(user.id).toEqual(userId);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/usuario/deletar/${userId}`);
    expect(req.request.method).toEqual('DELETE');

    req.flush({ id: userId });
  });

  it('should update an existing user', () => {
    const existingUser: Usuario = {
      id: 1,
      nome: 'Usuário Existente',
      telefone: '222222222',
      cpf: '222.222.222-22',
      enderecos: [],
      user: { id: 1, username: 'usuario_existente', role: 'ROLE_USER', token: 'a' }
    };

    usuarioService.verify(existingUser).subscribe(user => {
      expect(user).toEqual(existingUser);
    });

    const req = httpTestingController.expectOne(`http://localhost:8080/api/usuario/editar/${existingUser.id}`);
    expect(req.request.method).toEqual('PUT');

    req.flush(existingUser);
  });

});
