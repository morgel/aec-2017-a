import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

  authToken: any;

  constructor(private http: Http) { }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  getAllProjects() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/projects', {headers: headers})
      .map(res => res.json());
  }

  getOwnProjects() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile/projects/', {headers: headers})
      .map(res => res.json());
  }

  getFundedProjects() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile/funded-projects', {headers: headers})
      .map(res => res.json());
  }

  getInvestedProjects() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/users/profile/invested-projects', {headers: headers})
      .map(res => res.json());
  }

  makeInvestment(project, amount) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    const data = {
      'amount': amount
    };
    return this.http.post(`http://localhost:3000/projects/${project._id}/invest`, data, {headers: headers})
      .map(res => res.json());
  }

  cancelProject(project) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.delete(`http://localhost:3000/projects/${project._id}`, {headers: headers})
      .map(res => res.json());
  }

  withdrawFunding(project) {

  }

  createProject(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/projects', data, {headers: headers})
      .map(res => res.json());
  }

  getTokenOffers() {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:3000/projects/token-offers', {headers: headers})
      .map(res => res.json());
  }

  offerTokens(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`http://localhost:3000/users/offer-tokens`, data, {headers: headers})
      .map(res => res.json());
  }
  buyTokens(data) {
    const headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.post(`http://localhost:3000/users/buy-Tokens`, data, {headers: headers})
      .map(res => res.json());
  }
}
