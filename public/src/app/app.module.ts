import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MdButtonModule, MdCheckboxModule, MdToolbarModule, MdCardModule, MdInputModule,MdListModule,MdIconModule} from '@angular/material';
import {MdDialogModule, MdMenuModule, MdSelectModule, MdProgressBarModule, MdDatepickerModule, MdNativeDateModule} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { InvestmentsComponent, InvestmentsDialog } from './investments/investments.component';

import { DashboardComponent, CancelProjectDialog, WithdrawFundingDialog } from './dashboard/dashboard.component';
import {AuthService} from './services/auth.service';
import {ProjectsService} from './services/projects.service';


import {FlashMessagesModule } from 'angular2-flash-messages';
import { MarketplaceComponent ,BuyTokenDialog} from './marketplace/marketplace.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { CountdownComponent } from './shared/countdown/countdown.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProjectsComponent,
    InvestmentsComponent,
    DashboardComponent,
    InvestmentsDialog,
    CancelProjectDialog,
    WithdrawFundingDialog,
    MarketplaceComponent,
    ProjectDetailComponent,
    CountdownComponent,
    BuyTokenDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdToolbarModule,
    MdCardModule,
    MdInputModule,
    MdListModule,
    MdIconModule,
    NgxDatatableModule,
    MdDialogModule,
    FlashMessagesModule,
    MdMenuModule,
    MdSelectModule,
    MdProgressBarModule,
    MdDatepickerModule,
    MdNativeDateModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    ProjectsService],
  bootstrap: [AppComponent],
  entryComponents: [
    InvestmentsDialog,
    CancelProjectDialog,
    WithdrawFundingDialog,
    BuyTokenDialog
]
})
export class AppModule { }
