import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RamosalumnoPage } from './ramosalumno.page';

describe('RamosalumnoPage', () => {
  let component: RamosalumnoPage;
  let fixture: ComponentFixture<RamosalumnoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RamosalumnoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
