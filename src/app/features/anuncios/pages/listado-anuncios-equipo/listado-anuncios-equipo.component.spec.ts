import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoAnunciosEquipoComponent } from './listado-anuncios-equipo.component';

describe('ListadoAnunciosEquipoComponent', () => {
  let component: ListadoAnunciosEquipoComponent;
  let fixture: ComponentFixture<ListadoAnunciosEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoAnunciosEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoAnunciosEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
