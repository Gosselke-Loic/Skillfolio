import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCollaboratorsComponent } from './dashboard-collaborators.component';

describe('DashboardCollaboratorsComponent', () => {
  let component: DashboardCollaboratorsComponent;
  let fixture: ComponentFixture<DashboardCollaboratorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCollaboratorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCollaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
