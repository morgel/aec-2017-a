import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ProjectsComponent} from './projects/projects.component';
import {InvestmentsComponent} from './investments/investments.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProjectDetailComponent} from './project-detail/project-detail.component';
import {MarketplaceComponent} from './marketplace/marketplace.component';

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
    },
    {
      path: 'dashboard',
      component: DashboardComponent
    },
    {
      path: 'detail/:id',
      component: ProjectDetailComponent
    },
    {
      path: 'marketplace',
      component: MarketplaceComponent
    }
  ]
;
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
