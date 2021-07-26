import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";
  register: any = {};

  constructor(
    public auth: AngularFireAuth,
    public fire: AngularFirestore,
    public router: Router
  ) { 
    auth.authState.subscribe(resp => {
      if (resp) {
        router.navigateByUrl('/me')
      }
    })
  }

  ngOnInit(): void {
  }

  tapRegister(formData: any) {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(
      formData.value.email,
      formData.value.password
    ).then((resp) => {
      this.router.navigateByUrl('signin');
      this.register['role'] = 'user';
      this.fire.collection('user').add(this.register)
      this.loading = false;
    }).catch((err) => {
      this.loading = false;
      this.errorMessage = err['message'];
      this.showError = true;
    })

  }

  closeAlert() {
    this.showError = false;
  }

}
