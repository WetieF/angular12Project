import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../model/IUser';
import { Router } from 'express';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent implements OnInit {
 
 

  userDetails: IUser = {} as IUser;   //OneUser!: any;
  //userId: number = 0;  (a)

  constructor(private service: UserService, private activatedRouter: ActivatedRoute) {}

  ngOnInit(): void {

    // First get the product id from the current route.
    //this.userId = Number(this.activatedRouter.snapshot.paramMap.get('id')); (a)

    //let userID = Number(this.activatedRouter.snapshot.paramMap.get('id'));

    let userId = +(this.activatedRouter.snapshot.params['id']);  // on peut mettre + au lieu de Number

    /* this.activatedRouter.paramMap.subscribe((data) => {
      this.userId = Number(data.get('id'));
    }); */
 
    /*  this.activatedRouter.params.subscribe((params) => {
      this.userId = params['id'];
    });  */

    this.service.viewUser(userId).subscribe({
      next : (data) => {
        this.userDetails = data;
      },
      error : (err) => {
        console.log(err);
      }
    });
   
  }

}


// https://stackoverflow.com/questions/65659019/error-ts2322-type-string-null-is-not-assignable-to-type-number
