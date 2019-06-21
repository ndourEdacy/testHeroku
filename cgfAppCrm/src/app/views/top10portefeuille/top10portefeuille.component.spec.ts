import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10portefeuilleComponent } from './top10portefeuille.component';

describe('Top10portefeuilleComponent', () => {
  let component: Top10portefeuilleComponent;
  let fixture: ComponentFixture<Top10portefeuilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10portefeuilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10portefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
