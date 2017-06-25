import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectOwnerComponent } from './project-owner.component';

describe('ProjectOwnerComponent', () => {
  let component: ProjectOwnerComponent;
  let fixture: ComponentFixture<ProjectOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
