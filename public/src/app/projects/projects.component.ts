import { Component, OnInit } from '@angular/core';
import  {ProjectsService} from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  name: String;
  description: String;
  goal: number;

  constructor(private projectsService: ProjectsService) { }

  ngOnInit() {
  }

  createProject() {
    let data = {
      "name": this.name,
      "description": this.description,
      "goal": this.goal
    }
    this.projectsService.createProject(data);
  }
}
