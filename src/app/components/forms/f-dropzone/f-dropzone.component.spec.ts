import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FDropzoneComponent } from './f-dropzone.component';

describe('FDropzoneComponent', () => {
  let component: FDropzoneComponent;
  let fixture: ComponentFixture<FDropzoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FDropzoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FDropzoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
