import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { NotificationsService } from '../../components/notifications/notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = '';
  senha = '';

  inputPasswordType = 'password';
  isPassword = true;

  constructor(private authService: AuthenticationService,
    private notifications: NotificationsService, private router: Router) { }

  ngOnInit(): void { }

  login() {
    this.authService.auth(this.email, this.senha).subscribe({
      next: (v) => {
        console.log(v);
        this.router.navigate(['home']);
      },
      error: (e) => {
        const mensagem = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
        this.notifications.openSnackBar(mensagem);
      }
    });
  }

  openRegisterRoute(){
    this.router.navigate(['/usuario/cadastrar']);
    return false;
  }

  changeInputPasswordType() {
    this.inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
    this.isPassword = !this.isPassword;
  }

}
