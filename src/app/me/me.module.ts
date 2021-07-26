import { environment } from './../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MeComponent } from './me.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserComponent } from './user/user.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { OurStoriesComponent } from './our-stories/our-stories.component';

const routes: Routes = [
  {
    path: '',
    component: MeComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'our-stories',
        component: OurStoriesComponent
      },
      {
        path: 'user',
        component: UserComponent
      },
      {
        path: '',
        redirectTo: '/me/home',
        pathMatch: 'full'
      },
    ]
  },
]


@NgModule({
  declarations: [
    MeComponent,
    NavbarComponent,
    UserComponent,
    HomeComponent,
    OurStoriesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    FormsModule,
    TextareaAutosizeModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    DatePipe
  ],
})
export class MeModule { }
