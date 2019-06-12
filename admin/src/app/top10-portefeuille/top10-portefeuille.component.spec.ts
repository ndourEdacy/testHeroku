import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Top10PortefeuilleComponent } from './top10-portefeuille.component';

describe('Top10PortefeuilleComponent', () => {
  let component: Top10PortefeuilleComponent;
  let fixture: ComponentFixture<Top10PortefeuilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Top10PortefeuilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Top10PortefeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
