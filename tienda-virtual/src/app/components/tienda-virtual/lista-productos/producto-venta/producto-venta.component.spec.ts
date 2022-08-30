import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoVentaComponent } from './producto-venta.component';

describe('ProductoVentaComponent', () => {
  let component: ProductoVentaComponent;
  let fixture: ComponentFixture<ProductoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoVentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
