import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMusicaComponent } from './tipo-musica.component';

describe('TipoMusicaComponent', () => {
  let component: TipoMusicaComponent;
  let fixture: ComponentFixture<TipoMusicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMusicaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMusicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
