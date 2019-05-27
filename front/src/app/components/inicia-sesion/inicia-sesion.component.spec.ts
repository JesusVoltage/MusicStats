import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IniciaSesionComponent } from './inicia-sesion.component';

describe('IniciaSesionComponent', () => {
  let component: IniciaSesionComponent;
  let fixture: ComponentFixture<IniciaSesionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IniciaSesionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IniciaSesionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
