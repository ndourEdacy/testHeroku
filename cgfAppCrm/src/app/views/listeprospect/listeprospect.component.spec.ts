import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeprospectComponent } from './listeprospect.component';

describe('ListeprospectComponent', () => {
  let component: ListeprospectComponent;
  let fixture: ComponentFixture<ListeprospectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeprospectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeprospectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
