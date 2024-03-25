/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagListaAutosComponent } from './PagListaAutos.component';

describe('PagListaAutosComponent', () => {
  let component: PagListaAutosComponent;
  let fixture: ComponentFixture<PagListaAutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagListaAutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagListaAutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
