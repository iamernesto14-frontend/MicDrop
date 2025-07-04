import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAdminMenuComponent } from './mobile-admin-menu.component';

describe('MobileAdminMenuComponent', () => {
  let component: MobileAdminMenuComponent;
  let fixture: ComponentFixture<MobileAdminMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAdminMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAdminMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
