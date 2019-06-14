import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerousSituationComponent } from './dangerous-situation.component';

describe('DangerousSituationComponent', () => {
  let component: DangerousSituationComponent;
  let fixture: ComponentFixture<DangerousSituationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DangerousSituationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DangerousSituationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
