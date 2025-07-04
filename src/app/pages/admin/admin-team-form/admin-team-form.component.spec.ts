import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamFormComponent } from './admin-team-form.component';

describe('AdminTeamFormComponent', () => {
  let component: AdminTeamFormComponent;
  let fixture: ComponentFixture<AdminTeamFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTeamFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
