import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/user/register.service';
import IUser from 'src/app/interfaces/IUser';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';
import { format } from 'date-fns';
import { FormBuilder, FormGroup } from '@angular/forms';
import { email, maxLength, minLength, required, getInputError } from 'src/app/utils/Validators';

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
  form!: FormGroup;

  tiposUsuarios: TipoUsuario[] = [
    { value: 'ALUNO', label: 'Aluno' },
    { value: 'PROFESSOR', label: 'Professor' }
  ];

  inputPasswordType = 'password';
  isPassword = true;
  formSubmitted = false;

  constructor(
    private router: Router,
    private notifications: NotificationsService,
    private service: RegisterService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: ['', [required, minLength(5), maxLength(50)]],
      email: ['', [required, email]],
      senha: ['', [required, minLength(8), maxLength(50)]],
      dataNascimento: ['', [required]],
      tipoUsuario: ['', [required]]
    });
  }

  register() {
    if (this.form.valid) {
      const user = this.form.getRawValue() as IUser;
      user.dataNascimento = format(new Date(user.dataNascimento), 'yyyy-MM-dd');

      this.service.regiterUser(user).subscribe({
        next: (v) => {
          console.log(v);
          this.router.navigate(['']);
        },
        error: (e) => {
          const mensagem = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
          this.notifications.notify({ message: mensagem, type: 'error' });
        }
      });
    }
    this.formSubmitted = true;
  }

  backToLogin() {
    this.router.navigate(['']);
    return false;
  }

  changeInputPasswordType() {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
    this.isPassword = !this.isPassword;
  }

  getErrors(name: string, label = name) {
    return getInputError(this.formSubmitted, this.form.get(name), label);
  }
}
