import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {ProjectsService} from '../services/projects.service';
import {MdDialog} from '@angular/material';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  allProjects: any;
  allProjectsLoaded = false;
  currentTime : any;
  currentDate = new Date();

  constructor(private projectsService: ProjectsService,
              public dialog: MdDialog) {
  }

  getAllProjects() {
    this.allProjects = this.projectsService.getAllProjects()
      .subscribe(
        data => {
          this.allProjects = data;
          this.allProjectsLoaded = true;
          console.log(data);
        }
      );
  }

  isFunded(fundingEnd) {
    if((new Date(fundingEnd)).getTime() + 30 * 24 * 60 * 60 * 1000 > this.currentDate.getTime()) {
      return false;
    } else {
      return true;
    }
  }

  getRealFundingEnd(fundingEnd) {
    return new Date(new Date(fundingEnd).getTime() +  30 * 24 * 60 * 60 * 1000);
  }

  openDialog(project) {
    console.log(project);
    const investDialog = this.dialog.open(InvestmentsDialog, {'data': project});
    investDialog.afterClosed().subscribe(result => {
      if (result) {
        this.getAllProjects();
      }
    });
  }

  ngOnInit() {
    this.getAllProjects();
    this.currentTime = new Date().getTime();
    let timer = Observable.timer(0,1000);
    timer.subscribe(t=> this.currentTime = this.currentTime + 1);
  }


}
@Component({
  templateUrl: 'investmentDialog.html'
})
export class InvestmentsDialog {
  amount: number;
  project: any;

  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              private projectsService: ProjectsService) {
    this.project = data;
  }

  makeInvestment() {
    console.log(this.amount, this.project.name);
    this.projectsService.makeInvestment(this.project, this.amount)
      .subscribe( data => {
          console.log(data);
          this.amount = 0;
          this.project = null;
      });
  }
}
