import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {ProjectsService} from '../services/projects.service';
import {MdDialog} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getData: String;
  ownProjects: any;
  fundedProjects: any;
  ownProjectsLoaded = false;
  investedProjectsLoaded = false;

  constructor(
    private router: Router,
    private projectsService: ProjectsService,
    public dialog: MdDialog) {
  }

  openCancelProjectDialog(project) {
    const cancelDialog = this.dialog.open(CancelProjectDialog, {'data': project});
    cancelDialog.afterClosed().subscribe(result => {
      if (result) {
        this.projectsService.cancelProject(project);
        this.getOwnProjects();
      }
    });
  }

  openWithdrawFundingDialog(project) {
    this.dialog.open(WithdrawFundingDialog, {'data': project});
  }

  getOwnProjects() {
    this.projectsService.getOwnProjects()
      .subscribe(
        data => {
          this.ownProjects = data;
          this.ownProjectsLoaded = true;
        }
      );
  }

  getFundedProjects() {
    this.projectsService.getFundedProjects()
      .subscribe(
        data => {
          this.fundedProjects = data;
          this.investedProjectsLoaded = true;
        }
      );
  }

  gotoDetail(project): void {
    this.router.navigate(['/detail', project._id]);
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

