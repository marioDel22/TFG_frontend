import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnuncioJugadorComponent } from './crear-anuncio-jugador.component';

describe('CrearAnuncioJugadorComponent', () => {
  let component: CrearAnuncioJugadorComponent;
  let fixture: ComponentFixture<CrearAnuncioJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAnuncioJugadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAnuncioJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
