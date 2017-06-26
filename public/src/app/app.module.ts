import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import {MdButtonModule, MdCheckboxModule,MdToolbarModule, MdCardModule, MdInputModule,MdListModule,MdIconModule} from '@angular/material';
import {MdDialogModule} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent} from './login/login.component';
import { ProjectsComponent } from './projects/projects.component';
import { InvestmentsComponent } from './investments/investments.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    ProjectsComponent,
    InvestmentsComponent
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
    MdDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
