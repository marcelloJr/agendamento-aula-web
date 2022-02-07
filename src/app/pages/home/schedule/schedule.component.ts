import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ROLE_ALUNO, STATUS_SCHEDULE } from 'src/app/config/constants';
import { EnumScheduleStatus } from 'src/app/interfaces/EnumScheduleStatus';
import IScheduleTable from 'src/app/interfaces/IScheduleTable';
import { ScheduleService } from 'src/app/services/schedule/schedule.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['data', 'horaInicio', 'horaFim', 'status'];
  dataSource = new MatTableDataSource<IScheduleTable>();
  pageSize = 5;
  pageIndex = 0;
  length = 5;
  isLoading = false;

  statusSchedule = STATUS_SCHEDULE;
  requestFilter = '';

  filter = {
    professor: '',
    aluno: '',
    data: '',
    status: ''
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private scheduleService: ScheduleService, private userService: UserService) { }

  ngOnInit(): void {
    this.getDataSource();
    this.checkIfStudentOrTeacher();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  onSort(sortState: Sort) {
    // sortState.direction;
  }

  onFilter() {
    if(this.filter.professor !== '') {
      this.requestFilter = `professor.usuario.nome~'%${this.filter.professor}%'`;
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
