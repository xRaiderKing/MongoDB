import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ConferenceComponent } from './components/conference/conference.component';
import { ConferenceCrudComponent } from './components/conference-crud/conference-crud.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'conference', component: ConferenceComponent },
    { path: 'conference-crud', component: ConferenceCrudComponent },
];
