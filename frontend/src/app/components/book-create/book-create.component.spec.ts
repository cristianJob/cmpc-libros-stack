import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApiService } from '../../service/api.service';
import { BookCreateComponent } from './book-create.component';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('BookCreateComponent', () => {
  let component: BookCreateComponent;
  let fixture: ComponentFixture<BookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCreateComponent],
      providers: [ApiService, provideHttpClient(),
                {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => '1'
              }
            },
            queryParams: of({}),
            params: of({ id: '1' })
          }
        }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
