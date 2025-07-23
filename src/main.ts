import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom, inject } from '@angular/core';

import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';

import { AppComponent } from './app/app.component';
import { defineCustomElements } from '../stencil-library/dist/loader';

import routeConfig from './app/app.routes';

defineCustomElements(window);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routeConfig),
    provideAnimations(),
    importProvidersFrom(HttpLink),

    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: 'https://spacex-production.up.railway.app/',
        }),
      };
    }),
  ],
}).catch((err) => console.error(err));
