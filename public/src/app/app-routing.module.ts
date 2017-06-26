import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { InvestmentsComponent } from './investments/investments.component';
<<<<<<< HEAD
import {DashboardComponent} from './dashboard/dashboard.component';
=======
>>>>>>> frontend

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'projects',
        component: ProjectsComponent
    },
    {
        path: 'investments',
        component: InvestmentsComponent
<<<<<<< HEAD
    },
  {
    path: 'dashboard',
    component: DashboardComponent
  }
=======
    }
>>>>>>> frontend
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
