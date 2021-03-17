import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasMiscomprasComponent } from './compras-miscompras.component';

describe('ComprasMiscomprasComponent', () => {
  let component: ComprasMiscomprasComponent;
  let fixture: ComponentFixture<ComprasMiscomprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprasMiscomprasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasMiscomprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
