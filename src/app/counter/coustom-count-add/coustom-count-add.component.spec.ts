import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoustomCountAddComponent } from './coustom-count-add.component';

describe('CoustomCountAddComponent', () => {
  let component: CoustomCountAddComponent;
  let fixture: ComponentFixture<CoustomCountAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoustomCountAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoustomCountAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
