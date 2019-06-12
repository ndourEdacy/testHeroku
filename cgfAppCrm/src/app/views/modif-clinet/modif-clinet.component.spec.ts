import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifClinetComponent } from './modif-clinet.component';

describe('ModifClinetComponent', () => {
  let component: ModifClinetComponent;
  let fixture: ComponentFixture<ModifClinetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifClinetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifClinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
