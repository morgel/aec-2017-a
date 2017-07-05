import {Component, OnInit} from '@angular/core';
import {ProjectsService} from '../services/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  name: String;
  description: String;
  goal: number;
  isCreated = false;
  date: any;
  share: number;

  constructor(private projectsService: ProjectsService) {
  }

  ngOnInit() {
  }

  createProject() {
    const data = {
      'name': this.name,
      'description': this.description,
      'fundingGoal': this.goal
    }
    this.projectsService.createProject(data)
      .subscribe(
        data => {
          console.log(data);
          this.isCreated = true;
        }
      );
  }
}
