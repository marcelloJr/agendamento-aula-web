import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';
import IUser from './IUser';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';
import { format } from 'date-fns';

interface TipoUsuario {
  value: string;
  label: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  tiposUsuarios: TipoUsuario[] = [
    { value: 'ALUNO', label: 'Aluno' },
    { value: 'PROFESSOR', label: 'Professor' }
  ];

  nome = '';
  email = '';
  senha = '';
  tipoUsuario = '';
  dataNascimento = '';

  inputPasswordType = 'password';
  isPassword = true;

  constructor(private router: Router, private notifications: NotificationsService, private service: RegisterService) { }

  ngOnInit(): void { }


  register() {
    const user: IUser = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      tipoUsuario: this.tipoUsuario,
      dataNascimento: format(new Date(this.dataNascimento), 'yyyy-MM-dd')
    };

    this.service.regiterUser(user).subscribe({
      next: (v) => {
        console.log(v);
        this.router.navigate(['']);
      },
      error: (e) => {
        const mensagem = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
        this.notifications.openSnackBar(mensagem);
      }
    });
  }

  backToLogin() {
    this.router.navigate(['']);
    return false;
  }

  changeInputPasswordType() {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
    this.isPassword = !this.isPassword;
  }
}
