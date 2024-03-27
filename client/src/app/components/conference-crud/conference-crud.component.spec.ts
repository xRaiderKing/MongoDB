import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceCrudComponent } from './conference-crud.component';

describe('ConferenceCrudComponent', () => {
  let component: ConferenceCrudComponent;
  let fixture: ComponentFixture<ConferenceCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceCrudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConferenceCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
