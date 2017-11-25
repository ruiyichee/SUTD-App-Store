import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAppDetailsComponent } from './home-app-details.component';

describe('HomeAppDetailsComponent', () => {
  let component: HomeAppDetailsComponent;
  let fixture: ComponentFixture<HomeAppDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAppDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAppDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
