import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayToggleButtonComponent } from './play-toggle-button.component';

describe('PlayToggleButtonComponent', () => {
  let component: PlayToggleButtonComponent;
  let fixture: ComponentFixture<PlayToggleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayToggleButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlayToggleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
