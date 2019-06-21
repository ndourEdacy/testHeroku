import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TachecompenentComponent } from './tachecompenent.component';

describe('TachecompenentComponent', () => {
  let component: TachecompenentComponent;
  let fixture: ComponentFixture<TachecompenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TachecompenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TachecompenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
