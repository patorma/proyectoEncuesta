import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GustoMusicalComponent } from './gusto-musical.component';

describe('GustoMusicalComponent', () => {
  let component: GustoMusicalComponent;
  let fixture: ComponentFixture<GustoMusicalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GustoMusicalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GustoMusicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
