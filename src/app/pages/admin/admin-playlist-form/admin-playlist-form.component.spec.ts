import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlaylistFormComponent } from './admin-playlist-form.component';

describe('AdminPlaylistFormComponent', () => {
  let component: AdminPlaylistFormComponent;
  let fixture: ComponentFixture<AdminPlaylistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlaylistFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPlaylistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
