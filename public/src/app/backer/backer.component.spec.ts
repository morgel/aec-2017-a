import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackerComponent } from './backer.component';

describe('BackerComponent', () => {
  let component: BackerComponent;
  let fixture: ComponentFixture<BackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
