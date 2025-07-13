import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfessionComponent } from './confessions.component';

describe('ConfessionComponent', () => {
  let component: ConfessionComponent;
  let fixture: ComponentFixture<ConfessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfessionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
