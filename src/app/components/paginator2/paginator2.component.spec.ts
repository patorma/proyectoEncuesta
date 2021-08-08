import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginator2Component } from './paginator2.component';

describe('Paginator2Component', () => {
  let component: Paginator2Component;
  let fixture: ComponentFixture<Paginator2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Paginator2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Paginator2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
