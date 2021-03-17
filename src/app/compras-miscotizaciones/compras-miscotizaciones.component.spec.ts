import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasMiscotizacionesComponent } from './compras-miscotizaciones.component';

describe('ComprasMiscotizacionesComponent', () => {
  let component: ComprasMiscotizacionesComponent;
  let fixture: ComponentFixture<ComprasMiscotizacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasMiscotizacionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasMiscotizacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
