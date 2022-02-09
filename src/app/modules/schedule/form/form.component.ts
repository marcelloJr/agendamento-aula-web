import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { map, Observable, startWith } from 'rxjs';
import { NotificationsService } from 'src/app/components/notifications/notifications.service';
import { TEACHER_STATUS_SCHEDULE, STUDENT_STATUS_SCHEDULE } from 'src/app/config/constants';
import IScheduleStatus from 'src/app/interfaces/IScheduleStatus';
import ITeacher from 'src/app/interfaces/ITeacher';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { UserService } from 'src/app/services/user/user.service';
import { getInputError, required } from 'src/app/utils/Validators';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormCompoment implements OnInit {
  form!: FormGroup;
  formSubmitted = false;
  teachers!: ITeacher[];
  filteredTeachers: Observable<ITeacher[]> | undefined;
  scheduleId = 0;
  statusSchedule: IScheduleStatus[] = [];
  isView = false;
  userProfile = this.userService.getUserData().perfil;

  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private userService: UserService,
    private notifications: NotificationsService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];

    this.form = this.formBuilder.group({
      professor: ['', [required]],
      aluno: ['', []],
      data: ['', [required]],
      horaInicio: ['', [required]],
      horaFim: ['', [required]],
      observacaoAluno: ['', []],
      observacaoProfessor: ['', []],
      status: ['', []]
    });

    if(id) {
      this.scheduleId = id;
      this.isView = this.activatedRoute.snapshot.url[1].path === 'visualizar';
      this.getScheduleById(id);
    } else {
      this.getAllTeachers();
      this.filteredTeachers = this.form.get('professor')?.valueChanges.pipe(
        startWith(''),
        map(value => (typeof value === 'string' ? value : value.nome)),
        map(name => (name ? this.filter(name) : this.teachers)),
      );
    }

    this.statusSchedule = this.userProfile === 'ROLE_ALUNO' ? STUDENT_STATUS_SCHEDULE : TEACHER_STATUS_SCHEDULE;
  }

  register() {
    if (this.form.valid) {
      const schedule = this.form.getRawValue();
      schedule.observacao = this.userProfile === 'ROLE_ALUNO' ? schedule.observacaoAluno : schedule.observacaoProfessor;

      this.isLoading = true;

      if(this.scheduleId){
        this.scheduleService.updateSchedule(this.scheduleId, schedule).subscribe({
          next: (v) => {
            this.notifications.notify({ message: 'Agendamento alterado com sucesso', type: 'success' });
            this.router.navigate(['agendamento']);
          },
          error: (e) => {
            if(e.status === 401) {
              this.userService.logout();
            } else {
              const message = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
              this.notifications.notify({ message: message, type: 'error' });
            }
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      } else {
        schedule.data = format(new Date(schedule.data), 'yyyy-MM-dd');
        schedule.professor = schedule.professor.id;

        this.scheduleService.regiterSchedule(schedule).subscribe({
          next: (v) => {
            this.notifications.notify({ message: 'Agendamento criado com sucesso', type: 'success' });
            this.router.navigate(['agendamento']);
          },
          error: (e) => {
            if(e.status === 401) {
              this.userService.logout();
            } else {
              const message = Array.isArray(e.error) ? e.error[0].mensagem : e.error.mensagem;
              this.notifications.notify({ message: message, type: 'error' });
            }
            this.isLoading = false;
          },
          complete: () => {
            this.isLoading = false;
          }
        });
      }
    }

    this.formSubmitted = true;
  }

  private getAllTeachers() {
    this.isLoading = true;

    this.scheduleService.getTeachers().subscribe({
      next: ({content}) => {
        this.teachers = content;
      },
      error: (e) => {
        if(e.status === 401) {
          this.userService.logout();
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  private getScheduleById(id: number) {
    this.isLoading = true;

    this.scheduleService.getById(this.scheduleId).subscribe({
      next: (schedule) => {
        const status = this.isView ? this.statusSchedule.find(v => v.value === schedule.status)?.label : schedule.status;

        this.form = this.formBuilder.group({
          professor: [{value: {nome: schedule.professor}, disabled: !!id}, [required]],
          aluno: [{value: {nome: schedule.aluno}, disabled: !!id}, [required]],
          data: [{value: `${schedule.data}T00:00:00`, disabled: !!id}, [required]],
          horaInicio: [{value: schedule.horaInicio, disabled: !!id}, [required]],
          horaFim: [{value: schedule.horaFim, disabled: !!id}, [required]],
          observacaoAluno: [{value: schedule.observacaoAluno, disabled: this.isView || this.userProfile === 'ROLE_PROFESSOR'}, []],
          observacaoProfessor: [{value: schedule.observacaoProfessor, disabled: this.isView || this.userProfile === 'ROLE_ALUNO'}, []],
          status: [{value: status, disabled: this.isView }, []]
        });
      },
      error: (e) => {
        if(e.status === 401) {
          this.userService.logout();
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    })
  }

  private filter(name: string): ITeacher[] {
    const filterValue = name.toLowerCase();
    return this.teachers.filter(option => option.nome.toLowerCase().includes(filterValue));
  }

  getErrors(name: string, label = name) {
    return getInputError(this.formSubmitted, this.form.get(name), label);
  }

  displayTeacherName(teacher: ITeacher): string {
    return teacher && teacher.nome ? teacher.nome : '';
  }

  goBack() {
    this.router.navigate(['agendamento']);
    return false;
  }
}
