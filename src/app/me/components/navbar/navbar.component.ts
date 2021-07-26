import { Component, OnInit } from '@angular/core';
import { MeComponent } from '../../me.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private me: MeComponent
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.me.logOut();
  }

}
