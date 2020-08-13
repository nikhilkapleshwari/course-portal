import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { EditStudentComponent } from './components/edit-student/edit-student.component';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ShellComponent } from './components/shell/shell.component';
import { RoleGuardService } from './shared/role-guard.service';
import { LoginComponent } from './components/login/login.component';

const routes1: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'add-student' },
  {path: '',pathMatch: 'full', component: WelcomeComponent},
  { path: 'add-student', component: AddStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'students-list', component: StudentsListComponent }
];

const routes: Routes = [
  {
    path: 'home',
    component: ShellComponent,
    children:[
      { 
        path: 'add-student', 
        component: AddStudentComponent 
      },
      { 
        path: 'edit-student/:id', 
        component: EditStudentComponent 
      },
      { 
        path: 'students-list', 
        component: StudentsListComponent,
        canActivate: [RoleGuardService],
        data: { 
          expectedRole: 'admin'
        }  
      },
      { 
        path: 'login', 
        component: LoginComponent 
      }
    ]
  },
  {
    path: '',
    component: WelcomeComponent
  },
 //Wrong route
 { path: '**', component: ShellComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }