import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import  {ProjectsService} from '../services/projects.service';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ownProjects: any;
  fundedProjects: any;

  constructor(
    private projectsService: ProjectsService,
    public dialog: MdDialog) {
  }

  openCancelProjectDialog(project) {
    let cancelDialog = this.dialog.open(CancelProjectDialog, {"data": project});
    cancelDialog.afterClosed().subscribe(result => {
      if(result) {
        this.projectsService.cancelProject(project);
      }
    });
  }

  openWithdrawFundingDialog(project) {
    this.dialog.open(WithdrawFundingDialog, {"data": project});
  }

  getOwnProjects() {
    this.ownProjects = this.projectsService.getOwnProjects();
  }

  getFundedProjects() {
    this.fundedProjects = this.projectsService.getFundedProjects();
  }

  ngOnInit() {
    this.getOwnProjects();
    this.getFundedProjects();
  }


}

@Component({
  templateUrl: 'cancelProjectDialog.html'
})
export class CancelProjectDialog {
  project:any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.project = data;
  }
}

@Component({
  templateUrl: 'withdrawFundingDialog.html'
})
export class WithdrawFundingDialog {
  project:any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.project = data;
  }
}

