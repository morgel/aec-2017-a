import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {ProjectsService} from '../services/projects.service';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  allProjects: any;
  allProjectsLoaded = false;

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
