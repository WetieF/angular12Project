import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../model/IUser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit {

  addUserForm: FormGroup = new FormGroup({});
  //user!: IUser;

  constructor(private fb: FormBuilder, private service: UserService,
              private _snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.addUserForm = this.fb.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]] 
    });
  }

  createUser() {
    this.service.addUser(this.addUserForm.value).subscribe({
      next: (data) => {
        this._snackBar.open("User created successfully with ID " + data.id);
        console.log("User Created")
        this.router.navigate(['users/list']);
      },
      error: (err) => {
        console.log("No User added")
      }
    })
    console.log(this.addUserForm.value);
  }

}
