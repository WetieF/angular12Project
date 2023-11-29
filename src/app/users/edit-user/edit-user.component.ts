import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/IUser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  //user!: IUser;  // soit !
  userDetails: IUser = {} as IUser; // ou ceci
  dataLoaded: boolean = false;
  userId: number = 0;
  editUserForm : FormGroup = new FormGroup({});

  constructor(private activatedRoute: ActivatedRoute, 
              private servcie: UserService,
              private fb: FormBuilder,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {

    this.dataLoaded = false;
    
    /* this.activatedRoute.paramMap.subscribe(params => {

      this.userId = Number(params.get('id'));

      if (this.userId !== null) {

        // View user details
        this.servcie.viewUser(this.userId).subscribe({
          next: (data: IUser) => {

            this.userDetails = data;
            Object.assign(this.userDetails, data);
            console.log(this.userDetails);
            
            // Build the edit form hier
            this.editUserForm = this.fb.group({
              name: [this.userDetails.name],
              username: [this.userDetails.username],
              email: [this.userDetails.email]
            });
            this.dataLoaded = true;
          },
          error: (err) => {
            console.log(err);
          }
        })
      }

    }); */

    this.userId = +(this.activatedRoute.snapshot.params['id']);
    this.dataLoaded = false;
    
   if (this.userId !== null) {
      // View user details
      this.servcie.viewUser(this.userId).subscribe({
        next: (data) => {
          this.userDetails = data;
          Object.assign(this.userDetails, data);
          
          // Build the edit form hier
          this.editUserForm = this.fb.group({
            'name': [this.userDetails.name, [Validators.required]],
            'username': [this.userDetails.username, [Validators.required]],
            'email': [this.userDetails.email, [Validators.required, Validators.email]]
          });
          this.dataLoaded = true;
        }
      });
    } 
  }

  updateUser() {
    //console.log(this.editUserForm.value);
    this.servcie.updateUser(this.userId, this.userDetails).subscribe({
      next: (data) => {
        console.log(data);
        this._snackBar.open("User updated successfully with ID " + this.userId);
      },
      error: (err) => {
        this._snackBar.open("Unable to update user.");
      }
    })
  }

}
