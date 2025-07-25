import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { SpaceXComponent } from './space-x.component';

describe('SpaceXComponent', () => {
  let component: SpaceXComponent;
  let fixture: ComponentFixture<SpaceXComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaceXComponent, ApolloTestingModule],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpaceXComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
