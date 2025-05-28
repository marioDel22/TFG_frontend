import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAnuncioEquipoComponent } from './crear-anuncio-equipo.component';

describe('CrearAnuncioEquipoComponent', () => {
  let component: CrearAnuncioEquipoComponent;
  let fixture: ComponentFixture<CrearAnuncioEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearAnuncioEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAnuncioEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
