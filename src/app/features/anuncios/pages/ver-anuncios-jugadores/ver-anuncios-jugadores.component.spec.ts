import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAnunciosJugadoresComponent } from './ver-anuncios-jugadores.component';

describe('VerAnunciosJugadoresComponent', () => {
  let component: VerAnunciosJugadoresComponent;
  let fixture: ComponentFixture<VerAnunciosJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAnunciosJugadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAnunciosJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
