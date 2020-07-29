import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksListDetailsComponent } from './books-list-details.component';

describe('BooksListDetailsComponent', () => {
  let component: BooksListDetailsComponent;
  let fixture: ComponentFixture<BooksListDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BooksListDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksListDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
