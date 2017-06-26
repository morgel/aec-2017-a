import {Component, OnInit} from '@angular/core';
import  {ProjectsService} from '../services/projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ownProjects: any;

  constructor(
    private projectsService: ProjectsService) {
  }

  getOwnProjects() {
    this.ownProjects = this.projectsService.getOwnProjects();
  }

  ngOnInit() {
    this.getOwnProjects();
  }

}
