import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VueGlobaleDuMoiComponent } from './vue-globale-du-moi.component';

describe('VueGlobaleDuMoiComponent', () => {
  let component: VueGlobaleDuMoiComponent;
  let fixture: ComponentFixture<VueGlobaleDuMoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VueGlobaleDuMoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VueGlobaleDuMoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
