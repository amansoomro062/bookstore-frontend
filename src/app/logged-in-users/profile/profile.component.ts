import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { userprofile } from 'src/app/model/userprofile';
import { CustomeMatSnackBarService } from 'src/app/shared/custome-mat-snack-bar-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @ViewChild('profileForm', { static: false }) profileForm: HTMLFormElement;


  userProfile: userprofile = new userprofile('', '', '', '', '');
  profileEditable: boolean = false;
  showSpinner: boolean = false;
  isEmailAvailable: boolean = true;

  userOriginalEmail: string = '';


  username: string = ''
  firstname: string = '';
  lastname: string = '';
  address: string = '';
  genders: string[] = ['Male', 'Female', 'Others'];
  selectedGender: string = '';

  profile: boolean = false;

  //@ViewChild('username', { static: false }) inpu: ElementRef;



  constructor(private profileService: ProfileService,
             private customeMatSnackBar: CustomeMatSnackBarService) { }

  ngOnInit() {
    this.loadUserProfile();
  }


  loadUserProfile() {

    this.profileService.showProfileInformation()
      .subscribe(
        data => {
          this.userProfile = data;
        },
        error => {
          window.alert("failed");
        }
      )
  }


  updateUserProfile() {

    this.showSpinner = true;
    this.profileEditable = false;

    this.profileService.updateProfile(this.userProfile)
      .subscribe(
        data => {

              this.customeMatSnackBar.
                  showSnackBar('profile updated successfully')
                  .then(
                    (resolve)=>{
                      this.showSpinner=false;
                    }
                  )

        },
        error => {
          this.showSpinner = false;
        }
      )

  }


  validateEmail() {

    this.profileService.validateEmail(this.userProfile.username)
      .subscribe(
        emailAlreadyExists => {

          if (emailAlreadyExists) {
            this.isEmailAvailable = false;
            this.profileForm.form.controls['username'].setErrors({ 'incorrect': true });

          }

          //this.profileForm.form.controls['username'].setErrors(null);

        }

      );

  }

  resetForm() {
    this.profileEditable = false;
    this.profileForm.reset();
    this.loadUserProfile();

  }
}