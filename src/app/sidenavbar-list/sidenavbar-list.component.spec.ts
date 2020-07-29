import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavbarListComponent } from './sidenavbar-list.component';

describe('SidenavbarListComponent', () => {
  let component: SidenavbarListComponent;
  let fixture: ComponentFixture<SidenavbarListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavbarListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavbarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
