import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { format } from 'date-fns';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ROLE_ALUNO, STATUS_SCHEDULE } from 'src/app/config/constants';
import { EnumScheduleStatus } from 'src/app/interfaces/EnumScheduleStatus';
import IScheduleTable from 'src/app/interfaces/IScheduleTable';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { UserService } from 'src/app/services/user/user.service';
import { SpringFilterQueryBuilder as SFQB } from 'src/assets/SpringFilterQueryBuilder/src/index';

@Component({
  selector: 'app-list-schedule',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['data', 'horaInicio', 'horaFim', 'status', 'actions'];
  dataSource = new MatTableDataSource<IScheduleTable>();
  pageSize = 5;
  pageIndex = 0;
  length = 5;
  isLoading = false;

  statusSchedule = STATUS_SCHEDULE;
  requestFilter = '';

  userProfile = this.userService.getUserData().perfil;

  filter = {
    professor: '',
    aluno: '',
    data: '',
    status: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private scheduleService: ScheduleService,
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getDataSource();
    this.checkIfStudentOrTeacher();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  confirmLogout(): void {
    this.dialog.open(ModalComponent, {
      width: '300px',
      data: {
        title: "Fazer logout?",
        message: "Deseja realmente sair?",
        onConfirm: () => {
          this.userService.logout();
          this.dialog.closeAll();
        }
      }
    });
  }

  private getDataSource() {
    this.isLoading = true;

    this.scheduleService.getAllSchedules(this.pageSize, this.pageIndex, this.requestFilter).subscribe({
      next: ({content, totalElements}) => {
        this.length = totalElements;
        this.dataSource = content as any;
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
    });

  }

  onPageChange(event: any){
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.getDataSource();
  }

  checkIfStudentOrTeacher() {
    const role = this.userService.getUserData().perfil;
    this.displayedColumns.unshift(...['id', role === ROLE_ALUNO ? 'professor' : 'aluno']);
  }

  chipHandler(row: EnumScheduleStatus) {
    return {
      A_CONFIRMAR: {
        label: 'A Confirmar',
        class: 'chip-w100 justify-center'
      },
      CONFIRMADO: {
        label: 'Confirmado',
        class: 'chip chip-w100 chip-confirmed justify-center'
      },
      NEGADO: {
        label: 'Negado',
        class: 'chip chip-w100 chip-denied justify-center'
      },
      CANCELADO: {
        label: 'Cancelado',
        class: 'chip chip-w100 chip-cancelled justify-center'
      },
      EXECUTADO: {
        label: 'Executado',
        class: 'chip chip-w100 chip-executed justify-center'
      }
    }[row]
  }

  refreshDataSource() {
    this.getDataSource();
  }

  onFilter() {
    const date = this.filter.data ? format(new Date(this.filter.data), "yyyy-MM-dd") : '';
    let filter = [];

    if(this.userProfile === 'ROLE_ALUNO' && this.filter.professor !== '') {
      filter.push(SFQB.like('professor.usuario.nome', `%25${this.filter.professor}%25`));
    } else if(this.userProfile === 'ROLE_PROFESSOR' && this.filter.aluno !== '') {
      filter.push(SFQB.like('aluno.usuario.nome', `%25${this.filter.aluno}%25`));
    }

    if(date !== '') {
      filter.push(SFQB.equal('data', date));
    }

    if(this.filter.status !== '') {
      filter.push(SFQB.equal('status', this.filter.status));
    }

    if(filter.length){
      this.requestFilter = SFQB.and(...filter).toString();
    }

    if(this.requestFilter !== '') {
      this.getDataSource();
    }
  }

  onFilterClear() {
    this.filter = {
      professor: '',
      aluno: '',
      data: '',
      status: ''
    };

    this.requestFilter = '';

    this.getDataSource();
  }
}
