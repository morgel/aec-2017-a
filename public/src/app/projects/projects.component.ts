import {Component, OnInit, Attribute} from '@angular/core';
import {ProjectsService} from '../services/projects.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  private date;
  complexForm: FormGroup;
  name: String;
  description: String;
  goal: number;
  isCreated = false;
  date1: any;
  share: number;
  isError: boolean;


  constructor(private projectsService: ProjectsService, fb: FormBuilder) {
    this.date = new Date();
    this.complexForm = fb.group({
      'name': ['', Validators.required],
      'description': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
      'goal': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
      'date1': [null, Validators.compose([Validators.required, Validators.call(this.date1)])],
      'share': [null, Validators.compose([Validators.required, Validators.pattern("[0-9]+"), Validators.min(1), Validators.max(100)])]
    });
  }

  ngOnInit() {
  }

  createProject() {
    const data = {
      'name': this.name,
      'description': this.description,
      'fundingGoal': this.goal,
      'fundingEnd': this.date,
      'totalShare': this.share
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
