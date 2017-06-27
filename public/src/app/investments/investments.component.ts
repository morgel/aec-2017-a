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

  filters = [
    {value: '0', name: 'All'},
    {value: '1', name: 'Own'},
    {value: '2', name: 'Funded'}
  ];

  constructor(private projectsService: ProjectsService,
              public dialog: MdDialog) {
  }

  getOwnProjects() {
    this.allProjects = this.projectsService.getAllProjects();
  }

  openDialog(project) {
    console.log(project);
    this.dialog.open(InvestmentsDialog, {"data": project});
  }

  ngOnInit() {
    this.getOwnProjects();
  }

}
@Component({
  templateUrl: 'investmentDialog.html'
})
export class InvestmentsDialog {
  amount:number;
  project:any;

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    private projectsService: ProjectsService
  ) {
    this.project = data;
  }

  makeInvestment() {
    console.log(this.amount, this.project.name);
    this.projectsService.makeInvestment(this.project, this.amount);
  }
}
