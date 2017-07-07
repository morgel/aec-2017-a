import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {ProjectsService} from '../services/projects.service';
import {MdDialog} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getData: String;
  ownProjects: any;
  fundedProjects: any;
  investedProjects: any;
  ownProjectsLoaded = false;
  investedProjectsLoaded = false;
  fundedProjectsLoaded = false;
  currentDate = new Date();
  period = 2592000;

  constructor(private router: Router,
              private projectsService: ProjectsService,
              public dialog: MdDialog) {
  }

  isFunded(fundingEnd) {
    const fundingEndTime = new Date(new Date(fundingEnd).getTime() + this.period);

    if((new Date(fundingEnd)).getTime() > fundingEndTime.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  getCountdown(date) {
    return date.getTime() + this.period;
  }

  openCancelProjectDialog(project) {
    const cancelDialog = this.dialog.open(CancelProjectDialog, {'data': project});
    cancelDialog.afterClosed().subscribe(result => {
      if (result) {
        this.projectsService.cancelProject(project).subscribe(
          data => {
            console.log(data);
            if (data.success) {
              const index = this.ownProjects.indexOf(project);
              if (index > -1) {
                this.ownProjects.splice(index, 1);
              }
            }
          }
        );
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
          this.fundedProjects = data.projects;
          this.fundedProjectsLoaded = true;
        }
      );
  }

  getInvestedProjects() {
    this.projectsService.getInvestedProjects()
      .subscribe(
        data => {
          this.investedProjects = data.projects;
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
    this.getInvestedProjects();
  }


}

@Component({
  templateUrl: 'cancelProjectDialog.html'
})
export class CancelProjectDialog {
  project: any;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.project = data;
  }
}

@Component({
  templateUrl: 'withdrawFundingDialog.html'
})
export class WithdrawFundingDialog {
  project: any;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.project = data;
  }
}

