
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    var _confirm = confirm("Yakin ingin keluar ?");

    if(_confirm) {
      this.auth.signOut().then(resp => {
        this.router.navigateByUrl('auth');
      });
    }
  }

}
