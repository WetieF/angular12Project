import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/IUser';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit, AfterViewInit {

  //listUsers: IUser[] = [];  // (1) Sans table

  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'action'];
  dataSource = new MatTableDataSource<IUser>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private service: UserService){}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    /* this.service.listUser().subscribe((data: IUser[]) => {
      this.listUsers = data;
    },
    (err) => {
      console.log(err);
    }) */

    this.service.listUser().subscribe({
      next: (data: IUser[]) => {
        this.dataSource.data = data;  // la ou il ya dataSoruce.data on peut aussi avoir userlists sans point data
        console.log(this.dataSource.data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
