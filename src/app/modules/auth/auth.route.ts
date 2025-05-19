import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const authRoutes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Iniciar sesión'
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    title: 'Registro'
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  }
];  