import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilEquipoComponent } from './perfil-equipo.component';

describe('PerfilEquipoComponent', () => {
  let component: PerfilEquipoComponent;
  let fixture: ComponentFixture<PerfilEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilEquipoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
