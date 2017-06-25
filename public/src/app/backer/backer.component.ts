import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-backer',
  templateUrl: './backer.component.html',
  styleUrls: ['./backer.component.css']
})
export class BackerComponent implements OnInit {

  constructor() { }

// return list with all projects backed by this backer
  getMyProjects(){}

  ngOnInit() {
    // projects = getMyProjects();
  }

  projects=[
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
