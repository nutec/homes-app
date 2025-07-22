import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'stencil-library',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: 'stencil-library',
      directivesProxyFile: '../src/generated/directives/proxies.ts',
    }),
    {
      type: 'dist',
    },
    {
      type: 'www',
      serviceWorker: null, // Disable service workers
    },
  ],
};
