import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  columns = [
    { prop: 'name' },
    { prop: 'fundingStatus' },
    { prop: 'goal' }
  ];


  projects = [
    {
      name: "project1",
      fundingStatus: 80,
      goal: 10000
    },
    {
      name: "project2",
      fundingStatus: 80,
      goal: 20000
    },
    {
      name: "project3",
      fundingStatus: 80,
      goal: 30000
    }
  ]

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];
  notes = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
