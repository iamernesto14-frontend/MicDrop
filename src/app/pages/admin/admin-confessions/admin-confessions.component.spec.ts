import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfessionsComponent } from './admin-confessions.component';

describe('AdminConfessionsComponent', () => {
  let component: AdminConfessionsComponent;
  let fixture: ComponentFixture<AdminConfessionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConfessionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfessionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
