import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {MdDialog} from '@angular/material';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog(offer) {
    const investDialog = this.dialog.open(BuyTokenDialog, {'data': offer});
    investDialog.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }
}

@Component({
  templateUrl: 'buyTokenDialog.html'
})
export class BuyTokenDialog {
  amount: number;
  project: any;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.project = data;
  }

}
