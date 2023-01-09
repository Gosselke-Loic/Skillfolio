import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCollaboratorComponent } from './profile-collaborator.component';

describe('ProfileCollaboratorComponent', () => {
  let component: ProfileCollaboratorComponent;
  let fixture: ComponentFixture<ProfileCollaboratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCollaboratorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCollaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
