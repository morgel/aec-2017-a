import {Component, OnInit, Inject} from '@angular/core';
import {MD_DIALOG_DATA} from '@angular/material';
import {MdDialog, MdDialogRef} from '@angular/material';
import {ProjectsService} from '../services/projects.service';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css']
})
export class MarketplaceComponent implements OnInit {
  tokenOffers: any;

  constructor(public dialog: MdDialog,
  private projectService: ProjectsService) {
  }

  ngOnInit() {
    this.projectService.getTokenOffers().subscribe(
      data => {
        console.log(data.projects);
        this.tokenOffers = data.projects;

      }
    );
  }

  openBuyTokensDialog(offer) {
    const investDialog = this.dialog.open(BuyTokensDialog, {'data': offer});
    investDialog.afterClosed().subscribe(result => {
      if (result) {
        const data = {
          'projectAddress' : offer.address,
          'tokenOwnerAddress' : offer.offers[0].owner.address
        }
        this.projectService.buyTokens(data).subscribe(
          data => {
            console.log(data);
          })
      }
    });
  }

  openOfferTokensDialog() {
    this.dialog.open(OfferTokensDialog);
  }
}

@Component({
  templateUrl: 'buyTokenDialog.html'
})
export class BuyTokensDialog {
  offer: any;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.offer = data;
  }

}

@Component({
  templateUrl: 'offerTokenDialog.html'
})
export class OfferTokensDialog implements OnInit {
  fundedProjects: any;
  tokenAmount = 0;
  price: number;
  complexForm: FormGroup;
  selectedProject: any;
  enoughTokens = true;

  ngOnInit() {
    this.projectsService.getFundedProjects().subscribe(
      data => {
        console.log(data);
        this.fundedProjects = data.projects;
      }
    );
  }

  constructor(private projectsService: ProjectsService,
              fb: FormBuilder) {
    this.complexForm = fb.group({
      'fundedProject': ['', Validators.required],
      'tokenAmount': [null, Validators.compose([Validators.required, Validators.pattern('[0-9]+'), Validators.min(1)])],
      'price': [null, Validators.compose([Validators.required, Validators.pattern('[0-9]+')])],
    });
  }


  offerTokens() {
    const data = {
      'projectAddress': this.selectedProject.address,
      'amount': this.tokenAmount,
      'price': this.price
    }
    console.log(data);

    this.projectsService.offerTokens(data)
      .subscribe(
        data => {
          console.log(data);
        }
      );
  }

}
