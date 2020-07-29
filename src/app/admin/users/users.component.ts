import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CustomeMatSnackBarService } from 'src/app/shared/custome-mat-snack-bar-service';

import { userprofile } from 'src/app/model/userprofile';

import { UsersService } from './users-service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['star', 'username', 'firstname', 'lastname', 'gender', 'roles', 'active', 'address'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @ViewChild(MatSort, { static: true }) header: MatSort;

  condi = true;
  seasons: string[] = ['Admin', 'Users']
  favoriteSeason: string = "Admin";

  dataSource: MatTableDataSource<userprofile>;
  userProfile: userprofile[];

  isMobileActive : boolean = false;


      constructor(
        private usersService: UsersService,
        private customeSnackBar: CustomeMatSnackBarService,
        private bpObserver: BreakpointObserver
      ) { }

    ngOnInit() {
      this.fetchData();
      
      const isSmallScreen = this.bpObserver.isMatched('(max-width: 599px)');
      
      if(isSmallScreen){
        this.isMobileActive = true;
      }
    
    this.bpObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
          this.isMobileActive = true;
      }
      else{
          this.isMobileActive = false;
      }
    });
    }

  fetchData() {
    this.usersService.getUsers().subscribe(
      (users: userprofile[]) => {
        this.userProfile = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.header;
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onChange(element: userprofile) {

    if (element.active == 1) {
      element.active = 0
    }
    else {
      element.active = 1
    }

  }
  updateUsers() {

    this.usersService.updateUsers(this.dataSource.data)
      .subscribe
      (
        (updatedusers: userprofile[]) => {

          this.customeSnackBar.showSnackBar('Users Updated Successfully.')
            .then((data) => {
            })
        },
        error => {
          console.log(error)
        }
      )

  }
  discardChanges() {

    this.fetchData();
    
    this.customeSnackBar.showSnackBar('Changes Discarded..')
      .then((data) => {
      })
  }

}