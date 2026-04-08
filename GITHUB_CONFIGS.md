# .gitignore

# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Production
build/
dist/
.storybook-static/

# Misc
.DS_Store
*.pem
.env
.env.local
.env.*.local

# IDE
.idea/
.vscode/
*.swp
*.swo
*~
.sublime-project
.sublime-workspace

# Testing
coverage/
.nyc_output/
*.lcov

# Storybook
node_modules
.storybook-static
.cache

# OS
Thumbs.db

---
# .env.example

# Figma API Configuration
FIGMA_API_TOKEN=your_figma_api_token_here
FIGMA_FILE_ID=N1wh3u4sX3UGyUU5oWOaz6

# Optional: GitHub Actions
GITHUB_TOKEN=your_github_token_here

# Optional: NPM Publishing
NPM_TOKEN=your_npm_token_here

# Optional: Slack Notifications
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL

---
# .eslintrc.json

{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "plugins": [
    "@typescript-eslint"
  ],
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": ["./tsconfig.json"]
  },
  "rules": {
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "no-console": "warn",
    "prefer-const": "error"
  }
}

---
# .prettierrc.json

{
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "jsxBracketSameLine": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}

---
# .prettierignore

node_modules
.storybook-static
coverage
dist
build
*.min.js
*.min.css

---
# jest.config.js

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/*.stories.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

---
# tsconfig.json

{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM"],
    "module": "ESNext",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "paths": {
      "@/*": ["./src/*"],
      "@/tokens": ["./src/tokens"],
      "@/styles": ["./src/styles"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "build", ".storybook-static"]
}

---
# LICENSE (MIT)

MIT License

Copyright (c) 2024 Actuaría

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---
# CODE_OF_CONDUCT.md

# Código de Conducta

## Nuestro Compromiso

Nosotros, como miembros, contribuyentes y líderes, nos comprometemos a hacer de nuestra comunidad un ambiente libre de acoso para todos, sin importar edad, tamaño corporal, discapacidad visible o invisible, etnicidad, características sexuales, identidad y expresión de género, nivel de experiencia, educación, estatus socioeconómico, nacionalidad, apariencia personal, raza, religión u orientación sexual o identidad.

## Nuestras Normas

Ejemplos de comportamiento que contribuyen a un ambiente positivo:

- Usar un lenguaje acogedor e inclusivo
- Ser respetuoso con los puntos de vista y experiencias diferentes
- Aceptar crítica constructiva con gracia
- Enfocarse en lo que es mejor para la comunidad
- Mostrar empatía hacia otros miembros de la comunidad

## Aplicación

Reporta comportamiento inaceptable a: design-system@actuaria.com

---
# CHANGELOG.md

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-04-08

### Added
- Initial release of Design Tokens system
- 80+ color variables (primary, secondary, accent, semantic, neutral)
- Complete typography scale (9 sizes, 6 weights, 4 line heights)
- Spacing scale (9 levels, 4px base)
- Border radius tokens (5 values + pills)
- Shadow system (7 levels)
- Transition tokens (4 speeds)
- CSS variables export
- TypeScript exports with full type safety
- Storybook documentation
- GitHub Actions CI/CD pipeline
- NPM package ready

### Coming in Future Releases
- Auto-sync from Figma
- Icon tokens
- Animation tokens
- Component library
- Tailwind CSS integration

---
