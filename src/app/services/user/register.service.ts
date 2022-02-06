import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IUser from 'src/app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) { }

  regiterUser(newUser: IUser) {
    return this.httpClient.post('http://localhost:8080/usuario', {
      nome: newUser.nome,
      email: newUser.email,
      senha: newUser.senha,
      dataNascimento: newUser.dataNascimento,
      tipoUsuario: newUser.tipoUsuario
    });
  }
}
