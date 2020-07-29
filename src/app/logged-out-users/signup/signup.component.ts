import { Component, OnInit } from '@angular/core';
import { user } from '../../model/user';
import { SignupService } from 'src/app/logged-out-users/signup/services/signup-service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CustomeMatDialogService } from 'src/app/shared/custome-mat-dialog-service';
import { LoginComponent } from '../login/login.component';
import { BooksListComponent } from 'src/app/general/book/books-list/books-list.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  username: string
  password: string;
  firstname: string

  constructor(private singupService: SignupService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private customeDialog: CustomeMatDialogService
  ) { }

  ngOnInit() {
  }

  createUser() {

    let new_user = new user(this.username, this.password, this.firstname);

    this.singupService.CreateNewUser(new_user).subscribe(
      data => {
        this.firstname = ""
        this.username = '';
        this.password = '';

        this.router.navigate(['/login']);

        let snackBar = this._snackBar.open('account created', 'login', {
          duration: 3000
        });

        snackBar.onAction().subscribe(() => {
          this.router.navigateByUrl('/login');
        });


      }
      ,
      error => {
      }
    );
  }




}


