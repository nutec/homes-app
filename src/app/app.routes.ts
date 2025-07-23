import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RxjsSandboxComponent } from './components/rxjs-sandbox/rxjs-sandbox.component';
import { AuthGuard } from './guards/auth.guard';

const routeConfig: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    title: 'Details Page',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  {
    path: 'rxjs-sandbox',
    component: RxjsSandboxComponent,
    title: 'RxJS Sandbox',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    title: 'Dashboard',
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default routeConfig;
