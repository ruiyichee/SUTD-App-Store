import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedAppsComponent } from './recommended-apps.component';

describe('RecommendedAppsComponent', () => {
  let component: RecommendedAppsComponent;
  let fixture: ComponentFixture<RecommendedAppsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedAppsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
