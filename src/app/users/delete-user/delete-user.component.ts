import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css'
})
export class DeleteUserComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, 
              private service: UserService,
              private _snackBar: MatSnackBar,
              private route: Router) {}

  ngOnInit(): void {

    let userId = this.activatedRoute.snapshot.params['id'];

    if (userId) {
      this.service.deleteUser(userId).subscribe({
        next: (data) => {
          this._snackBar.open("User with ID " + userId + " was deleted");
          this.route.navigate(['users/list']);
      },
      error: (err) => {
          this._snackBar.open("User with ID " + userId + " unable to delete");
      }
      })
    }
  }

}
