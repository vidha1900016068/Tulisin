import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../me.component.scss']
})
export class HomeComponent implements OnInit {
  isEmpty: boolean = true;
  listData: any = {};

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    private fire: AngularFirestore,
  ) { 
    this.checkUser();
  }

  ngOnInit(): void {
  }

  checkUser() {
    this.auth.authState.subscribe(resp => {
      if (!resp) {
        this.router.navigateByUrl('/auth')
      } else {
        this.getData();
      }
    })
  }

  getData() {
    this.fire.collection('blogs', ref => ref.orderBy('created_at', 'desc')).snapshotChanges().subscribe((resp) => {
      this.listData = resp
      if (this.listData.length === 0) {
        this.isEmpty = true;
      }
      else {
        this.isEmpty = false;
      }
    })
  }

}
