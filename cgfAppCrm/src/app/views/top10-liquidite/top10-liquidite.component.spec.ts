import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10LiquiditeComponent } from './top10-liquidite.component';

describe('Top10LiquiditeComponent', () => {
  let component: Top10LiquiditeComponent;
  let fixture: ComponentFixture<Top10LiquiditeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10LiquiditeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10LiquiditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
