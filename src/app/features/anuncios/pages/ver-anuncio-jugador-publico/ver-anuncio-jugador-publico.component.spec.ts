import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAnuncioJugadorPublicoComponent } from './ver-anuncio-jugador-publico.component';

describe('VerAnuncioJugadorPublicoComponent', () => {
  let component: VerAnuncioJugadorPublicoComponent;
  let fixture: ComponentFixture<VerAnuncioJugadorPublicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAnuncioJugadorPublicoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAnuncioJugadorPublicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
