import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../me.component.scss']
})
export class UserComponent implements OnInit {

  dataUser: any = {}

  constructor(
    router: Router,
    auth: AngularFireAuth,
    fire: AngularFirestore
  ) {
    auth.authState.subscribe(resp => {
      if (!resp) {
        router.navigateByUrl('/auth')
      } else {
        fire.collection('user').ref.where('email', '==', resp!.email).onSnapshot(snapshot => {
          snapshot.forEach(ref => {
            this.dataUser = ref.data();
          })
        })
      }
    })
   }

  ngOnInit(): void {
  }

}
