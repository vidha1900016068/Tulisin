import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-stories',
  templateUrl: './our-stories.component.html',
  styleUrls: ['../me.component.scss']
})
export class OurStoriesComponent implements OnInit {

  data: any = {}
  dataUser: any = {}
  listData: any = {}

  idData?: string;
  selectedImage?: string;
  now: number = Date.now();

  isEmpty: boolean = true;
  isAdmin: boolean = false;
  loading: boolean = false;
  isCollapsed: boolean = true;
  showMessage: boolean = false;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    private fire: AngularFirestore,
    private datePipe: DatePipe
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
        this.fire.collection('user').ref.where('email', '==', resp!.email).onSnapshot(snapshot => {
          snapshot.forEach(ref => {
            this.dataUser = ref.data();
            if(this.dataUser.role == 'admin') {
              this.isAdmin = true;
            }
            this.getData();
          })
        })
      }
    })
  }

  cleanData() {
    this.data = {};
    this.idData = undefined;
    this.loading = false;
  }

  getData() {
    this.fire.collection('blogs', ref => ref.where('author', '==', this.dataUser.username)).snapshotChanges().subscribe((resp) => {
      this.listData = resp
      if (this.listData.length === 0) {
        this.isEmpty = true;
      }
      else {
        this.isEmpty = false;
      }
    })
  }

  simpan() {
    this.loading = true;
    this.data['created_at'] = this.datePipe.transform(this.now, 'MMM d, y, h:mm:ss a');

    this.data['author'] = this.dataUser.username;

    if(this.idData != null) {
      
      this.fire.collection('blogs').doc(this.idData).update(this.data);
    } else {

      this.fire.collection('blogs').add(this.data);
    }
    this.showMessage = true;
    this.cleanData();
  }

  detail(data: any, id: string) {
    this.idData = id;
    this.data = data;
  }

  delete() {
    var _confirm = confirm("Konfirmasi hapus data ?");
    
    if(_confirm) {
      this.fire
      .collection("blogs")
      .doc(this.idData)
      .delete();
    }
  }

  closeAlert() {
    this.showMessage = false;
  }

}
