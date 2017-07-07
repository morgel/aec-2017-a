import {Observable} from 'rxjs/Rx';
import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})

export class CountdownComponent implements OnInit {

  @Input() endDate: any;

  private _trialEndsAt;

  private _diff: number;

  private _days: number;

  private _hours: number;

  private _minutes: number;

  private _seconds: number;

  constructor() {
  }

  ngOnInit() {

    this._trialEndsAt = "2017-02-28";

    Observable.interval(1000).map((x) => {
      this._diff = Date.parse(this.endDate) - Date.parse(new Date().toString());
    }).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
    });
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }
}
