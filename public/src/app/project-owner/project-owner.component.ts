import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-owner',
  templateUrl: './project-owner.component.html',
  styleUrls: ['./project-owner.component.css']
})
export class ProjectOwnerComponent implements OnInit {

selectedProject: null;

  constructor() { }

  // return a list with all projects created by this project owner
  getMyProjects(){}

  // kill this project and Smart Contract
  cancelProject(){}

  ngOnInit() {
    // projects = getMyProjects();
  }

  onSelect(project): void {
    this.selectedProject = project;
  }

  projects=[
    {
      name: "Next biggy",
      fundingStatus: 67
    },
    {
      name: "io disruptor",
      fundingStatus: 78
    },
    {
      name: "Kohlekraftwerk",
      fundingStatus: 34
    }
  ]

}
