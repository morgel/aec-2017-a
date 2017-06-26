import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  authToken:any;

  constructor(private http:Http) { }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getAllProjects() {
    // let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    // return this.http.get('http://localhost:3000/projects/getAll', {headers: headers})
    //   .map(res => res.json());
  }

  getOwnProjects() {
    // let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    // return this.http.get('http://localhost:3000/projects/getOwn', {headers: headers})
    //   .map(res => res.json());

    return [
      {
        "name" : "project1",
        "description": "sample description",
        "fundingStatus" : 50
      },
      {
        "name" : "project2",
        "description": "sample description",
        "fundingStatus" : 50
      },
      {
        "name" : "project3",
        "description": "sample description",
        "fundingStatus" : 50
      },
      {
        "name" : "project4",
        "description": "sample description",
        "fundingStatus" : 50
      },
      {
        "name" : "project5",
        "description": "sample description",
        "fundingStatus" : 50
      },
      {
        "name" : "project6",
        "description": "sample description",
        "fundingStatus" : 50
      }
    ];
  }

  getFundedProjects() {
    // let headers = new Headers();
    // this.loadToken();
    // headers.append('Authorization', this.authToken);
    // headers.append('Content-Type', 'application/json');
    // return this.http.get('http://localhost:3000/projects/getFunded', {headers: headers})
    //   .map(res => res.json());
  }

}
