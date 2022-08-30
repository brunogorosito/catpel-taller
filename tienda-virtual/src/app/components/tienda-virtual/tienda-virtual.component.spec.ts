import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaVirtualComponent } from './tienda-virtual.component';

describe('TiendaVirtualComponent', () => {
  let component: TiendaVirtualComponent;
  let fixture: ComponentFixture<TiendaVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TiendaVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
