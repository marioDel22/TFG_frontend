import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAnuncioEquipoComponent } from './editar-anuncio-equipo.component';

describe('EditarAnuncioEquipoComponent', () => {
  let component: EditarAnuncioEquipoComponent;
  let fixture: ComponentFixture<EditarAnuncioEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarAnuncioEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarAnuncioEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
