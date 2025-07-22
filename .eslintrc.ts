module.exports = {
  root: true, // Ensures ESLint does not look higher in the directory tree
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.html'], // Angular files (TypeScript and HTML templates)
      extends: [
        'plugin:@angular-eslint/recommended', // Angular-specific linting rules
        'plugin:@typescript-eslint/recommended', // TypeScript linting rules
      ],
      parserOptions: {
        ecmaVersion: 2020, // Modern JavaScript syntax
        sourceType: 'module',
        project: ['./tsconfig.app.json'], // Points to Angular's TypeScript configuration
      },
      rules: {
        // Add custom linting rules for Angular/TypeScript here
      },
    },
    {
      files: ['stencil-library/**/*.ts', 'stencil-library/**/*.tsx'], // Stencil files
      extends: [
        'plugin:@stencil/recommended', // Recommended rules for Stencil projects
        'plugin:@typescript-eslint/recommended', // Recommended rules for TypeScript
      ],
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: ['./stencil-library/tsconfig.json'], // Points to Stencil's TypeScript configuration
      },
      rules: {
        // Add or override custom rules for Stencil/TypeScript here
      },
    },
  ],
};
