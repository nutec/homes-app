import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { defineCustomElements } from '../stencil-library/dist/loader';
import routeConfig from './app/app.routes';

defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routeConfig), provideHttpClient()],
}).catch((err) => console.error(err));
