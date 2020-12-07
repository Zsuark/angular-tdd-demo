import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';


describe('AppComponent', () => {

  const title = 'Angular TDD Example Application';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title '${ title }'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual(title);
  });

  it(`should render the title in an <h1> tag -- <h1>${ title }</h1>`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const element = fixture.nativeElement;
    const h1 = element.querySelector("h1");
    fixture.detectChanges();
    expect(h1.textContent).toEqual(title);
  });

});
